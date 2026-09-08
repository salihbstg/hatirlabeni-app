export const saveTokens = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken",accessToken);
    localStorage.setItem("refreshToken",refreshToken)
};

export const deleteTokens=()=>{
    localStorage.clear("accessToken");
    localStorage.clear("refreshToken");
}