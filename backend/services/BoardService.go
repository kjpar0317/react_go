package services

import (
	"../models"
	"../utils"
	"strings"
	"time"

	"github.com/drgrib/iter"
)

var boardlist [] models.IBoard

func InitBoardList() {
	boardlist = make([]models.IBoard, 0)
	var maxindex = 0
	df := time.Now().Format(time.RFC3339)

	/*
	2, 2, 0, 1, 2번째 글 ...
	4, 2, 1, 2, RE: 2번째 글 ...
	5, 2, 2, 3, RE:RE:2번째 글 ...
	3, 2, 3, 2, RE: 2번째 글 ...
	1, 1, 0, 1, 1번째 글....
	*/
	for i := range iter.N(1000){
		boardlist = append(boardlist, models.IBoard{i, i, 0, 1, "test", `"테스트" i`, `"테스트 내용" i`, "SYSTEM", df, "SYSTEM", df})
		maxindex++
	}

	boardlist = append(boardlist, models.IBoard{maxindex, maxindex, 0, 1, "test", "테스트 제목", "테스트 내용", "SYSTEM", df, "SYSTEM", df})
	var grpno = maxindex
	maxindex++
	boardlist = append(boardlist, models.IBoard{maxindex, grpno, 1, 2, "test", "RE: 테스트 제목", "테스트 내용", "SYSTEM", df, "SYSTEM", df})
	maxindex++
	boardlist = append(boardlist, models.IBoard{maxindex, grpno, 2, 3, "test", "RE: RE: 테스트 제목", "테스트 내용", "SYSTEM", df, "SYSTEM", df})
	maxindex++
	boardlist = append(boardlist, models.IBoard{maxindex, grpno, 3, 2, "test", "RE : 테스트 제목", "테스트 내용", "SYSTEM", df, "SYSTEM", df})
	maxindex++
	boardlist = append(boardlist, models.IBoard{maxindex, maxindex, 0, 1, "test", "초기화 테스트 마지막", "초기화 테스트 마지막 내용", "SYSTEM", df, "SYSTEM", df})
}

func SelectBoardList(bfilter models.IBoardFilter) [] models.IBoard {
	if bfilter == (models.IBoardFilter{}) && bfilter.Page == 0 {
		bfilter.Page = 1
	}
	if bfilter == (models.IBoardFilter{}) && bfilter.NumPerPage == 0 {
		bfilter.NumPerPage = 15
	}

	var start = (bfilter.Page - 1) * bfilter.NumPerPage
	var end = start + bfilter.NumPerPage

	filterlist := [] models.IBoard {}

	if bfilter.SearchKey != "" {
		if bfilter.SearchKey == "name" {
			for _, boardinfo := range boardlist {
				if strings.Index(boardinfo.Writer, bfilter.SearchWord) >= 0 {
					filterlist = append(filterlist, boardinfo)
				}
			}
		}

		if bfilter.SearchKey == "title" {
			for _, boardinfo := range boardlist {
				if strings.Index(boardinfo.Title, bfilter.SearchWord) >= 0 {
					filterlist = append(filterlist, boardinfo)
				}
			}
		}

		if bfilter.SearchKey == "content" {
			for _, boardinfo := range boardlist {
				if strings.Index(boardinfo.Content, bfilter.SearchWord) >= 0 {
					filterlist = append(filterlist, boardinfo)
				}
			}
		}

		utils.NewSorter().
			AddInt(func(i interface{}) int { return i.(models.IBoard).Grpord}).
			AddInt(func(i interface{}) int { return i.(models.IBoard).Depth}).
			SortStable(filterlist)

		utils.NewSorter().
			AddInt(func(i interface{}) int { return i.(models.IBoard).Grpno }).
			ReverseSortStable(filterlist)

		filterlist = filterlist[start:end]

		return filterlist
	} else {

		utils.NewSorter().
			AddInt(func(i interface{}) int { return i.(models.IBoard).Grpord}).
			AddInt(func(i interface{}) int { return i.(models.IBoard).Depth}).
			SortStable(boardlist)

		utils.NewSorter().
			AddInt(func(i interface{}) int { return i.(models.IBoard).Grpno }).
			ReverseSortStable(boardlist)

		filterlist = boardlist[start:end]

		return filterlist
	}
}

func AddBoard(boardinfo models.IBoard) bool {
	df := time.Now().Format(time.RFC3339)

	// userid가 있는 경우 false
	if boardinfo.Bbsno == 0 {
		utils.NewSorter().
			AddInt(func(i interface{}) int { return i.(models.IBoard).Bbsno}).
			ReverseSortStable(boardlist)

		boardinfo.Bbsno = boardlist[0].Bbsno + 1
		boardinfo.Grpno = boardlist[0].Bbsno + 1
		boardinfo.Grpord = 0
		boardinfo.Depth = 0
		boardinfo.Createdby = boardinfo.Writer
		boardinfo.Createdtime = df
		boardinfo.Updatedby = boardinfo.Writer
		boardinfo.Updatedtime = df

		boardlist = append(boardlist, boardinfo)
	} else {
		var nGrpOrd int = 0

		for _, tmpboardinfo := range(boardlist) {
			if tmpboardinfo.Grpno == boardinfo.Grpno {
				nGrpOrd++
			}
		}

		boardinfo.Bbsno = cap(boardlist)
		boardinfo.Grpno = boardinfo.Bbsno
		boardinfo.Grpord = nGrpOrd
		boardinfo.Depth = boardinfo.Depth + 1
		boardinfo.Updatedby = boardinfo.Writer
		boardinfo.Updatedtime = df

		boardlist = append(boardlist, boardinfo)
	}

	return true
}

func EditBoard(boardinfo models.IBoard) bool {
	for index, tmpboardinfo := range(boardlist) {
		if tmpboardinfo.Bbsno == boardinfo.Bbsno {
			boardlist[index] = boardinfo
		}
	}
	return true
}

func DeleteBoard(bbsno int) bool {
	for index, tmpboardinfo := range(boardlist) {
		if tmpboardinfo.Bbsno == bbsno {
			boardlist = append(boardlist[:index], boardlist[index+1:]...)
		}
	}
	return true
}
