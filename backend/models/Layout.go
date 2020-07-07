package models

import "backend/utils"

type ILayout struct {
	Index     string           `json:"i"`
	X         int              `json:"x"`
	Y         int              `json:"y"`
	Width     int              `json:"w"`
	Height    int              `json:"h"`
	MinHeight *utils.NullInt64 `json:"minH"`
	MaxHeight *utils.NullInt64 `json:"maxH"`
}
