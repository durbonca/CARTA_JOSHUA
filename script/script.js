var menu_food_boton = document.getElementById("menu_food_boton")
var menu_food = document.getElementById("menu_food")
var menu_cool_boton = document.getElementById("menu_cool_boton")
var menu_cool = document.getElementById("menu_cool")
var menu_alcohol_boton = document.getElementById("menu_alcohol_boton")
var menu_alcohol = document.getElementById("menu_alcohol")
var menu_hot_boton = document.getElementById("menu_hot_boton")
var menu_hot = document.getElementById("menu_hot")
var menu_no_alcohol_boton = document.getElementById("menu_no_alcohol_boton")
var menu_no_alcohol = document.getElementById("menu_no_alcohol")
var menu_beer_boton = document.getElementById("menu_beer_boton")
var menu_beer = document.getElementById("menu_beer")

menu_food_boton.addEventListener("click", food)
menu_cool_boton.addEventListener("click", cool)
menu_alcohol_boton.addEventListener("click", alcohol)
menu_hot_boton.addEventListener("click", hot)
menu_no_alcohol_boton.addEventListener("click", no_alcohol)
menu_beer_boton.addEventListener("click", beer)

function food() { window.alert("food") }

function cool() { window.alert("cool") }

function alcohol() { window.alert("alcohol") }

function hot() { window.alert("hot") }

function no_alcohol() { window.alert("no_alcohol") }

function beer() { window.alert("beer") }