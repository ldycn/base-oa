import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '../../../components/com-button';
import MaterialButton from '@material-ui/core/Button';
import { WithStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';

interface Props extends WithStyles {};

interface HeaderProps extends WithStyles {
  advancedSearchOnclick: any,
  barCodeSearchOnclick: any,
};

interface HeaderProps extends WithStyles {
  show: boolean,
  formValue: {
    title: string,
    documentId: string,
  }
};


interface FooterProps {
  searchConfirmOnclick: any,
  searchResetOnclick: any,
};

const Header = (props: HeaderProps) => {
  return (
    <Grid container direction='row' justify='space-between' >
      <Grid item>
        收文拟办查询
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          className={props.classes.buttonLeft}
          onClick={props.advancedSearchOnclick}
        >筛选查询</Button>
        <Button 
          onClick={props.barCodeSearchOnclick}
          variant="outlined"
          className={props.classes.buttonRight}
        >条码查询</Button>
      </Grid>
    </Grid>
  );
}

const AdvancedSearchCard = () => {
  return (
    <Card className={props.classes.advancedSearchCard}>
      <CardContent>
      </CardContent>
    </Card>
  );
}

const Footer = (props: FooterProps) => {
  return (
    <Grid container direction='row' justify='center' spacing={3} >
      <Grid item>
        <MaterialButton
          variant="contained"
          color="primary"
          onClick={props.searchConfirmOnclick}
        >
          查询
        </MaterialButton>
      </Grid>
      <Grid item>
        <MaterialButton 
          onClick={props.searchResetOnclick}
          variant="outlined"
          color="primary"
        >
          重置
        </MaterialButton>
      </Grid>
    </Grid>
  )
}

const RecieveDocumentManagement = (props: Props) => {
  function advancedSearchOnclick() {
    props.doTest('asfafawwafa');
    console.log('click筛选查询');
  }
  function barCodeSearchOnclick() {
    console.log('click条码查询');
  }
  function searchConfirmOnclick() {
    console.log('click查询');
  }
  function searchResetOnclick() {
    console.log('click重置');
  }
  return (
    <Card className={props.classes.searchCard}>
      <CardContent>
        <Header
          classes={props.classes}
          advancedSearchOnclick={advancedSearchOnclick}
          barCodeSearchOnclick={barCodeSearchOnclick}
        />
        <AdvancedSearchCard />
        <Footer
          searchConfirmOnclick={searchConfirmOnclick}
          searchResetOnclick={searchResetOnclick}
        />
      </CardContent>
    </Card>
  )
}

function mapStateToProps(state: any) {
  return {
    test: state.test
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    doTest: (data: any) => dispatch(test(data)),
  }
}

const WrappedRecieveDocumentManagement = connect(mapStateToProps as any, mapDispatchToProps as any)(RecieveDocumentManagement);
export default WrappedRecieveDocumentManagement;