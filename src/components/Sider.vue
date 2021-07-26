<!--
 * @file 主页slider
-->

<template>
    <Menu
        ref="side_menu"
        :active-name="curMenu"
        :open-names="openMenu"
        theme="dark"
        width="auto"
        class="c-left-menu"
        @on-select="handleMenuSelect"
    >
        <template v-for="item in menuList">
            <Submenu
                v-if="item.submenu"
                :key="item.name"
                :name="item.name"
            >
                <template slot="title">
                    <Icon type="ios-paper"/>{{ item.label }}
                </template>
                <!-- eslint-disable -->
                <MenuItem v-for="subItem in item.submenu" :key="subItem.name"
                    :name="subItem.name"
                    :to="{name: subItem.name}"
                ><Icon type="md-document"/>{{ subItem.label }}</MenuItem>
                <!-- eslint-disable -->
            </Submenu>
            <MenuItem
                v-else
                :key="item.name"
                :name="item.name"
                :to="{name: item.name}"
            ><Icon type="ios-paper"/>{{ item.label }}</MenuItem>
        </template>
    </Menu>
</template>

<script>
// import vuebus from '@/utils/event-bus';
import {api} from '@/utils';

export default {
    props: {
        routeName: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            menuList: [],
            menuObj: {},
            openMenu: [],
            pathName: '',
            curMenu: ''
        };
    },
    watch: {
        routeName(val, oldVal) {
            if (val.indexOf('material') === 0) {
                val = 'material';
            }
            if (this.curMenu !== val) {
                this.curMenu = val;
                this.handleMenuSelect(val);
            }
        }
    },
    created() {
        api('getSidemenu').then(res =>
        {
            if (res.errno === 0) {
                this.menuList = res.data.sidemenu;

                this.$nextTick(() => {
                    this.initMenu();
                    this.$refs.side_menu.updateOpened();
                    this.$refs.side_menu.updateActiveName();
                });
            }
        });
    },
    methods: {
        handleMenuSelect(name) {
            this.menuObj[name] && this.$emit('on-change', this.menuObj[name].label);
        },
        initMenu(name) {
            let materialName = '素材';
            let tmpObj = {
                // materialContent: {label: materialName, pathName: 'materialContent'},
                // materialCompetitor: {label: materialName, pathName: 'materialCompetitor'},
                // materialQuery: {label: materialName, pathName: 'materialQuery'}
            };
            this.menuList.forEach(item => {
                if (item.submenu) {
                    item.submenu.forEach(subItem => {
                        tmpObj[subItem.name] = {
                            label: subItem.label,
                            pathName: item.name
                        }
                    })
                } else {
                    tmpObj[item.name] = {
                        label: item.label,
                        pathName: item.name
                    }
                }
            })
            // console.log('menuObj', tmpObj, this.curMenu);
            this.menuObj = tmpObj;
            let curItem = this.menuObj[this.curMenu];

            if (curItem) {
                this.pathName = curItem.pathName;
                this.$emit('on-change', curItem.label);
            }
        }
    },
};
</script>

<style lang="less">
.c-left-menu {
    overflow: hidden;
    // background-color: @menu-dark-active-bg;
    // 隐藏边框
    &.ivu-menu-vertical.ivu-menu-light:after {
        display: none;
    }
}
</style>
