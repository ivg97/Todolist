import React from "react";

export const Menu = () => {
    return (
        <header class="clearfix">
            <div class="container">
                <div class="header-left">
                    <h1>TodoList</h1>
                </div>
                <div class="header-right">
                    <label for="open">
                        <span class="hidden-desktop"></span>
                    </label>
                    <input type="checkbox" name="" id="open"/>
                        <nav>
                            <a href="#">Главная</a>
                            <a href="#">Пользователи</a>
                            <a href="#">Блог</a>
                            <a href="#">Сообщество</a>
                            <a href="#">О нас</a>
                        </nav>
                </div>
            </div>
        </header>
)
}
export default Menu