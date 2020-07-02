package models

import "../utils"

type ILayout struct {
	Index    	int `json:"i"`
	X    		int `json:"x"`
	Y    		int `json:"y"`
	Width    	int `json:"w"`
	Height    	int `json:"h"`
	MinWidth 	*utils.NullInt64 `json:"minW"`
	MaxWidth 	*utils.NullInt64 `json:"maxW"`
	MinHeight 	*utils.NullInt64 `json:"minH"`
	MaxHeight 	*utils.NullInt64 `json:"maxH"`
}
