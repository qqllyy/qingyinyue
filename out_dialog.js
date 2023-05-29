// -----------------------------弹出iframe页面
function mzy_show_iframe(url, w, h) {
    if (h == 0) {
        var t_height = $(window).height() - 150;
    } else {
        var t_height = h;
    }
    frame_height = t_height - 30;
    mzy_show_dialog("<iframe src=\"" + url + "\" width=" + w + "px height=" + frame_height + " frameborder=0 scrolling=auto ><\/iframe>", w, t_height, 2, 1, 1, 1, 0)
}
//------------------------------------弹出提醒框
function mzy_show_msg(msg, stay_time) {

    $("<div id='mzy_show_message_div'>" + msg + "</div>").appendTo("body").hide().fadeIn("fast").delay(stay_time).fadeOut("slow", function() {
        $(this).remove();
    });
}

//-------------------------------------载入一个居中层
//javascript:mzy_show_dialog('login.php?user=22',600,300,1,1,1,2000)//载入地址或html，宽，高，载入类型（1为url；2为html），是否默认显示关闭按钮，是否加载黑色，动画效果延时，width_percent为宽度百分比
function mzy_show_dialog(d_content, d_width, d_height, load_type, is_close, back_black, speed_time, width_percent = 0) {
    //添加一个层
    var close_html = "";
    if (is_close == 1) {
        close_html = "<div style='text-align:right;font-size:12px;'><span onclick='mzy_close_dialog(" + speed_time + ")' style='cursor:pointer' id='mzy_show_dialog_div_close'>[关闭]</span></div>";
    }
    $("body").append("<div id='mzy_show_dialog_div'>" + close_html + "<div id='mzy_show_dialog_div_zi'>载入中...</div></div>");
    if (width_percent > 0) {
        page_width = document.body.clientWidth;

        d_width2 = page_width * width_percent / 100;
        if (d_width2 < d_width) {
            d_width = d_width2;
        }
    }
    //定义样式
    $("#mzy_show_dialog_div").css('width', d_width + 'px');
    $("#mzy_show_dialog_div").css('height', d_height + 'px');

    $("#mzy_show_dialog_div").css('margin-left', -((d_width / 2) + 20) + 'px');
    $("#mzy_show_dialog_div").css('margin-top', -d_height / 2 + 'px');

    $("#mzy_show_dialog_div_zi").html("载入中...");
    //载入内容
    if (load_type == 1) {
        //随机地址参数防止缓存
        var x = 99;
        var y = 95;
        var rand = parseInt(Math.random() * (x - y + 1) + y);
        if (d_content.indexOf("?") >= 0) {
            d_content = d_content + "&xxxx=" + rand;
        } else {
            d_content = d_content + "?xxxx=" + rand;
        }

        $("#mzy_show_dialog_div_zi").load(d_content); //页面为utf-8编码时
        //$("#mzy_show_dialog_div_zi").load(d_content,"application/x-www-form-urlencoded; charset=utf-8",function(data) {$("#mzy_show_dialog_div_zi").html(data);});

    } else {
        $("#mzy_show_dialog_div_zi").html(d_content);
    }
    $("#mzy_show_dialog_div").toggle(speed_time); //显示        
    var docheight = $(document).height();
    //追加一个层，使背景变灰

    if (back_black == 1) {
        $("body").append("<div id='greybackground'></div>");
        $("#greybackground").css({
            "opacity": "0.5",
            "height": docheight
        });
    }

}
//-------------------------------------对话框关闭
function mzy_close_dialog(speed_time) {
    $("#mzy_show_dialog_div").hide(speed_time); //关闭
    $("#greybackground").remove();
}




function mzy_show_dialog2(d_content, d_width, d_height, load_type, is_close, back_black, speed_time) { //载入地址或html，宽，高，载入类型（1为url；2为html），是否默认显示关闭按钮，是否加载黑色，动画效果延时(未开发)
    //添加一个层
    var close_html = "";
    if (is_close == 1) {
        close_html = "<div style='text-align:right;font-size:12px;'><span onclick='mzy_close_dialog2(" + speed_time + ")' style='cursor:pointer' id='mzy_show_dialog2_div_close'>[关闭]</span></div>";
    }
    $("body").append("<div id='mzy_show_dialog2_div'>" + close_html + "<div id='mzy_show_dialog2_div_zi'>载入中...</div></div>");
    //定义样式
    $("#mzy_show_dialog2_div").css('width', d_width + 'px');
    $("#mzy_show_dialog2_div").css('height', d_height + 'px');

    $("#mzy_show_dialog2_div").css('margin-left', -((d_width / 2) + 20) + 'px');
    $("#mzy_show_dialog2_div").css('margin-top', -d_height / 2 + 'px');
    $("#mzy_show_dialog2_div_zi").html("载入中...");
    //载入内容
    if (load_type == 1) {
        //随机地址参数防止缓存
        var x = 99;
        var y = 95;
        var rand = parseInt(Math.random() * (x - y + 1) + y);
        if (d_content.indexOf("?") >= 0) {
            d_content = d_content + "&xxxx=" + rand;
        } else {
            d_content = d_content + "?xxxx=" + rand;
        }

        $("#mzy_show_dialog2_div_zi").load(d_content); //页面为utf-8编码时
    } else {
        $("#mzy_show_dialog2_div_zi").html(d_content);
    }
    $("#mzy_show_dialog2_div").toggle(speed_time); //显示        
    var docheight = $(document).height();
    //追加一个层，使背景变灰
    $("body").append("<div id='greybackground2'></div>");
    if (back_black == 1) {
        $("#greybackground2").css({
            "opacity": "0.5",
            "height": docheight
        });
    }

}

function mzy_close_dialog2(speed_time) {
    $("#mzy_show_dialog2_div").hide(speed_time); //关闭
    $("#greybackground2").remove();
}