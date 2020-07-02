package utils

import (
	"database/sql/driver"
	"strconv"
)

type NullInt64 struct {
	Val     int64
	IsValid bool
}

func NewNullInt64(val interface{}) NullInt64 {
	ni := NullInt64{}
	ni.Set(val)
	return ni
}

func (ni *NullInt64) Scan(value interface{}) error {
	ni.Val, ni.IsValid = value.(int64)
	return nil
}

func (ni NullInt64) Value() (driver.Value, error) {
	if !ni.IsValid {
		return nil, nil
	}
	return ni.Val, nil
}

func (ni *NullInt64) Set(val interface{}) {
	ni.Val, ni.IsValid = val.(int64)
}

func (ni NullInt64) MarshalJSON() ([]byte, error) {
	if !ni.IsValid {
		return []byte(`null`), nil
	}

	return []byte(strconv.FormatInt(ni.Val, 10)), nil
}

func (ni *NullInt64) UnmarshalJSON(data []byte) error {
	if data == nil || string(data) == `null` {
		ni.IsValid = false
		return nil
	}

	val, err := strconv.ParseInt(string(data), 10, 64)
	if err != nil {
		ni.IsValid = false
		return err
	}

	ni.Val = val
	ni.IsValid = true

	return nil
}

func (ni NullInt64) String() string {
	if !ni.IsValid {
		return `<nil>`
	}

	return strconv.FormatInt(ni.Val, 10)
}
