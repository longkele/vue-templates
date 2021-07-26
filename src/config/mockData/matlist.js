/**
 * 
 * @file 本地调试时，mock数据
 */

let img = require('../../assets/img/met.jpeg');

export default {
    "errno": 0,
    "msg": "",
    "data": {
        "total": 1,
        "list": [
            {
                "create_time": 1575238001,
                "meta": {
                    "publish_time": 1575238001,
                    "tags": "菜谱,烹饪,美食,好吃,健康",
                    "title": "美食推荐 蛤蜊香菇鱼丸汤 干锅鲜虾 辣子泥鳅",
                    "height": 230,
                    "width": 409,
                    "size": 28859
                },
                "cover": img
            }
        ],
        "ui": {
            "mcauditEnable": true
        }
    }
}