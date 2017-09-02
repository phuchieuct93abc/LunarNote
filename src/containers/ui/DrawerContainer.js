/**
 * Whole App Container
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import { DefaultRenderer } from 'react-native-router-flux';
// Consts and Libs
import { AppSizes,AppColors } from '@theme/';
import Profile from '../../components/profile';
import { Card, CardItem, CardBody, Tabs, Tab, Container, Form, Item, Input, Label, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

/* Redux ==================================================================== */
// Actions
import * as SideMenuActions from '@redux/sidemenu/actions';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  sideMenuIsOpen: state.sideMenu.isOpen,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  toggleSideMenu: SideMenuActions.toggle,
  closeSideMenu: SideMenuActions.close,
};

/* Component ==================================================================== */
class DrawerView extends Component {
  static componentName = 'Drawer';

  static propTypes = {
    navigationState: PropTypes.shape({}),
    onNavigate: PropTypes.func,
    sideMenuIsOpen: PropTypes.bool,
    closeSideMenu: PropTypes.func.isRequired,
    toggleSideMenu: PropTypes.func.isRequired,
  }

  static defaultProps = {
    navigationState: null,
    onNavigate: null,
    sideMenuIsOpen: null,
  }


  /**
    * Toggle Side Menu
    */
  onSideMenuChange = (isOpen) => {
    if (isOpen !== this.props.sideMenuIsOpen) {
      this.props.toggleSideMenu();
    }
  }

  render() {
   

    return (
      <Container style={{backgroundColor:AppColors.background}}>
           <Profile/>

      </Container>
    
       
    );
  }
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, mapDispatchToProps)(DrawerView);
