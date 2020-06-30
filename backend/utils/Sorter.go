package utils

import (
	"reflect"
	"sort"
)

type Sorter struct{ keys []Key }

func NewSorter() *Sorter { return new(Sorter) }

func (l *Sorter) AddStr(key StringKey) *Sorter { l.keys = append(l.keys, key); return l }
func (l *Sorter) AddInt(key IntKey) *Sorter    { l.keys = append(l.keys, key); return l }

func (l *Sorter) SortStable(slice interface{}) {
	value := reflect.ValueOf(slice)
	sort.SliceStable(slice, func(i, j int) bool {
		si := value.Index(i).Interface()
		sj := value.Index(j).Interface()
		for _, key := range l.keys {
			if key.Less(si, sj) {
				return true
			}
			if key.Less(sj, si) {
				return false
			}
		}
		return false
	})
}

func (l *Sorter) ReverseSortStable(slice interface{}) {
	value := reflect.ValueOf(slice)
	sort.SliceStable(slice, func(i, j int) bool {
		si := value.Index(i).Interface()
		sj := value.Index(j).Interface()
		for _, key := range l.keys {
			if key.Less(sj, si) {
				return true
			}
			if key.Less(sj, si) {
				return false
			}
		}
		return false
	})
}

type Key interface {
	Less(a, b interface{}) bool
}

type StringKey func(interface{}) string

func (k StringKey) Less(a, b interface{}) bool  { return k(a) < k(b) }

type IntKey func(interface{}) int

func (k IntKey) Less(a, b interface{}) bool  { return k(a) < k(b) }
