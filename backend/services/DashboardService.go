package services

import (
	"backend/models"
	"backend/utils"
)

var layouts []models.ILayout

func InitLayouts() {
	layouts = make([]models.ILayout, 0)

	/*
	   { i: '1', x: 0, y: 0, w: 1, h: 2, minH: 2, maxH: 2 },
	    { i: '2', x: 1, y: 0, w: 1, h: 2, minH: 2, maxH: 2 },
	    { i: '3', x: 0, y: 1, w: 1, h: 2, minH: 2, maxH: 2 },
	    { i: '4', x: 1, y: 1, w: 1, h: 2, minH: 2, maxH: 2 },
	*/
	layouts = append(layouts, models.ILayout{1, 0, 0, 1, 2, nil, nil, &utils.NullInt64{2, true}, &utils.NullInt64{2, true}})
	layouts = append(layouts, models.ILayout{2, 1, 0, 1, 2, nil, nil, &utils.NullInt64{2, true}, &utils.NullInt64{2, true}})
	layouts = append(layouts, models.ILayout{3, 0, 1, 1, 2, nil, nil, &utils.NullInt64{2, true}, &utils.NullInt64{2, true}})
	layouts = append(layouts, models.ILayout{4, 1, 1, 1, 2, nil, nil, &utils.NullInt64{2, true}, &utils.NullInt64{2, true}})
}

func SelectLayouts() []models.ILayout {
	return layouts
}
