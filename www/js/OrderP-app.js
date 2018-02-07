function logout() {
    if (confirm("是否退出该账户")) {
        return;
    }
    window.localStorage.clear();
    location.href = "../html/Login-app.html";
}