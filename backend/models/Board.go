	
package models

type IBoard struct {
	Bbsno       int    `json:"bbsno"`
	Grpno       int    `json:"grpno"`
	Grpord      int    `json:"grpord"`
	Depth       int    `json:"depth"`
	Title       string `json:"title"`
	Content     string `json:"content"`
	Createdby   string `json:"createdby"`
	Createdtime string `json:"createdtime"`
	Updatedby   string `json:"updatedby"`
	Updatedtime string `json:"updatedtime"`
}

/*
  2, 2, 0, 1, 2번째 글 ...
  4, 2, 1, 2, RE: 2번째 글 ...
  5, 2, 2, 3, RE:RE:2번째 글 ...
  3, 2, 3, 2, RE: 2번째 글 ...
  1, 1, 0, 1, 1번째 글....
*/
