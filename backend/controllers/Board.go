package controllers

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo"

	"backend/models"
	"backend/services"
)

func SelectBoardList(c echo.Context) (err error) {
	filter := new(models.IBoardFilter)
	if err = c.Bind(filter); err != nil {
		return echo.ErrBadRequest
	}

	return c.JSON(http.StatusOK, echo.Map{
		"boardlist": services.SelectBoardList(*filter),
	})
}

func AddBoard(c echo.Context) (err error) {
	boardinfo := new(models.IBoard)

	if err = c.Bind(boardinfo); err != nil {
		return echo.ErrBadRequest
	}

	return c.JSON(http.StatusOK, echo.Map{
		"isRegisted": services.AddBoard(*boardinfo),
	})
}

func EditBoard(c echo.Context) (err error) {
	boardinfo := new(models.IBoard)

	if err = c.Bind(boardinfo); err != nil {
		return echo.ErrBadRequest
	}

	return c.JSON(http.StatusOK, echo.Map{
		"isRegisted": services.EditBoard(*boardinfo),
	})
}

func DeleteBoard(c echo.Context) (err error) {
	bbsno, _ := strconv.Atoi(c.Param("bbsno"))

	return c.JSON(http.StatusOK, echo.Map{
		"isDeleted": services.DeleteBoard(bbsno),
	})
}
