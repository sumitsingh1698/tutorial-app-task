
(() => {
    $('#video-button').click(function () {
        handleVideoButton();
    });
    $('#artical-button').click(function () {
        handleArticalButton();
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
            const active = $(".active")[0].id;
            const url = $('.' + active + '-next-page-url')[0].innerHTML;
            if (url.trim().length !== 0) {
                callData(url);
            }
        }
    });
})();
var currentPage = 1;
var hostUrl = "http://localhost:5556";
const GetAPICall = async (url) => {
    const response = await fetch(hostUrl + url);
    const myJson = await response.json();
    return myJson;
}
const callData = async (url) => {
    //extract JSON from the http response
    const myJson = await GetAPICall(url);
    if (myJson.content) {
        const active = $(".active")[0].id;
        if (active && active.includes("video")) {
            $(".video-container")[0].innerHTML += myJson.content;
            $(".video-button-next-page-url")[0].innerHTML = myJson.nextPageUrl;
        }
        else {
            $(".artical-container")[0].innerHTML += myJson.content;
            $(".artical-button-next-page-url")[0].innerHTML = myJson.nextPageUrl;
        }
    }
    else {
        $(".artical-button-next-page-url")[0].innerHTML = "";
        $(".video-button-next-page-url")[0].innerHTML = "";
    }
}

const handleVideoButton = () => {
    $(".artical-container")[0].hidden = "hidden";
    $(".video-container")[0].hidden = "";
    $("#video-button").addClass("active");
    $("#artical-button").removeClass("active");
    refreshVideoData();
}

const handleArticalButton = () => {
    $(".artical-container")[0].hidden = "";
    $(".video-container")[0].hidden = "hidden";
    $("#artical-button").addClass("active");
    $("#video-button").removeClass("active");
}

const refreshVideoData = async () => {
    const myJson = await GetAPICall("/api/class4/chapter1/video/page0");
    console.log(myJson);
    if (myJson) {
        $(".video-container")[0].innerHTML = myJson.content;
        $(".video-button-next-page-url")[0].innerHTML = myJson.nextPageUrl;
    }
    else {
        $(".video-button-next-page-url")[0].innerHTML = "";
    }
}


