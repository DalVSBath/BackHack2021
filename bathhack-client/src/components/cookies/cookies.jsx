const Cookies = (() => {
    // Constants
    const CookieNameHeader = "somegenericname_"
    const AccessTokenCookieName = CookieNameHeader + "token";
    const RefreshTokenCookieName = CookieNameHeader + "refresh";
    const TokenVerificationCookieName = CookieNameHeader + "auth";
    const ReturnPageCookieName = CookieNameHeader + "page";
    const VersionNumberCookieName = CookieNameHeader + "version";

    const Get = name => {
        var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
        return v ? v[2] : null;
    };

    const Has = name => { 
        return Get(name) !== null;
    }

    const Set = (name, value, hours) => {
        var d = new Date();
        d.setTime(d.getTime() + 1000 * 60 * 60 * hours);
        document.cookie =
            name + "=" + value + ";path=/;expires=" + d.toGMTString();
    };

    const Delete = name => Set(name, "", -1);

    return {
        Get,
        Has,
        Set,
        Delete,
        AccessTokenCookieName,
        RefreshTokenCookieName,
        TokenVerificationCookieName,
        ReturnPageCookieName,
        VersionNumberCookieName,
    };
})();

export default Cookies;
