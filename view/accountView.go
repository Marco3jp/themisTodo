package view

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"../models"
)

type AccountView struct {
	*BaseView
}

func (self AccountView) GetAdd(c *gin.Context) {
	c.HTML(http.StatusOK, "accountAdd", gin.H{
		"Title": "New Account",
	})
}

func (self AccountView) PostAdd(c *gin.Context, json *models.AccountAddResultJson) {
	c.JSON(http.StatusOK, json)
}