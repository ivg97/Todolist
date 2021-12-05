import React from "react";
import {Link, BrowserRouter} from "react-router-dom";


export const Menu = () => {
    return (
        <header className="clearfix">
            <div className="container">
                <div className="header-left">
                    <h1>TodoList</h1>
                </div>

                <div className="header-right">
                    <label for="open">
                        <span className="hidden-desktop"></span>
                    </label>
                    <input type="checkbox" name="" id="open"/>
                    <nav>
                        <a href="#">Главная</a>
                        <a href="#">Пользователи</a>
                        <a href="#">Блог</a>
                        <a href="#">Сообщество</a>
                        <a href="#">О нас</a>
                    </nav>
                    <div className="menu-todo">
                        <Link to="/">Пользователи</Link>
                        <Link to="/projects/">Проекты</Link>
                        <Link to="/notes/">Заметки</Link>

                    </div>
                </div>
            </div>
        </header>
    )
}
export default Menu