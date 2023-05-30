import React from "react";

/**
 * ПР 12
 * ревьюер: Анастасия Подкопаева
 *
 * Чтобы не дублировать верстку, можно создать общий базовый компонент для авторизации и регистрации
 * и использовать его везде. Например, AuthForm
 *
 */

function AuthForm({
    handleSubmit,
    formName,
    headerText,
    buttonText,
    isLoading,
    formCaption,
    children,
  }) {

  return (
    <main className="auth">
        <h1 className="auth__header">{headerText}</h1>
        <form action="#" className={`auth__form auth__form_${formName}`} name={formName} onSubmit={handleSubmit} noValidate>

          {children}

          <button className={`auth__button ${isLoading && 'auth__button_disabled'}`} type="submit" disabled={isLoading}>{buttonText}</button>
        </form>
        {formCaption && formCaption}
    </main>
  )
}

export default AuthForm;
