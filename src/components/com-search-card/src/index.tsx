import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '../../../components/com-hidden-button';
import MaterialButton from '@material-ui/core/Button';
import { WithStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import { test } from '../../../Redux/actions/testActions';
import FormItem from '../../../components/com-form-item';
import { Input, Select, DatePicker, Icon } from 'antd';

const Option = Select.Option;
const { RangePicker } = DatePicker;

interface Props extends WithStyles {
  doTest: any,
  test: string,
  formInfo: any,
};

interface HeaderProps extends WithStyles {
  advancedSearchOnclick: any,
  barCodeSearchOnclick: any,
  foldOnlick: any,
  unfoldOnlick: any,
  isFold: any,
};

interface AdvancedSearchCardProps extends WithStyles {
  formInfo: any,
  onChange: any,
  formValue: any,
};

interface FooterProps {
  confirmOnclick: any,
  resetOnclick: any,
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
        >
          筛选查询
        </Button>
        <Button 
          onClick={props.barCodeSearchOnclick}
          variant="outlined"
          className={props.classes.buttonRight}
        > 
          条码查询
        </Button>
        {props.isFold ?
          <Icon className={props.classes.iconButton} onClick={props.unfoldOnlick} type="up" />
          :
          <Icon className={props.classes.iconButton} onClick={props.foldOnlick} type="down" />}
      </Grid>
    </Grid>
  );
}

const makeFormItem = (props: any) => {
  const { formInfo, onChange, formValue } = props;
  const {key ,title, type, options } = formInfo;
  let component = <></>;
  switch (type) {
    case 'Input':
      component = (
        <FormItem key={key} title={title} xs={3}>
          <Input
            value={formValue[key]}
            onChange={(e) => onChange(e.target.value, key)}
          />
        </FormItem>
      );
      break;
    case 'Select':
      component = (
        <FormItem key={key} title={title} xs={3}>
          <Select
            value={formValue[key]}
            style={{ width: '100%' }}
            onChange={(e) => onChange(e, key)}
          >
              {options.map((name: any) => <Option key={name} value={name}>{name}</Option>)}
            </Select>
        </FormItem>
      );
      break;
    case 'RangePicker':
      component = (
        <FormItem key={key} title={title} xs={6}>
          <RangePicker
            style={{ width: '100%' }}
            value={formValue[key]}
            onChange={(e) => onChange(e, key)}
          />
        </FormItem>
      );
      break;
    default:
      break;
  }
  return component
}

const AdvancedSearchCard = (props: AdvancedSearchCardProps) => {
  return (
    <Card className={props.classes.advancedSearchCard}>
      <CardContent>
        <Grid container alignItems="baseline" direction='row' justify="flex-start" spacing={10}>
          {props.formInfo.map((v: any) => makeFormItem({
            onChange: props.onChange,
            formInfo: v,
            formValue: props.formValue
          }))}
        </Grid>
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
          onClick={props.confirmOnclick}
        >
          查询
        </MaterialButton>
      </Grid>
      <Grid item>
        <MaterialButton 
          onClick={props.resetOnclick}
          variant="outlined"
          color="primary"
        >
          重置
        </MaterialButton>
      </Grid>
    </Grid>
  )
}
function setOpenInitialValue(formValue: any) {
  const result: any = {};
  formValue.forEach((v: any) => result[v.key] = v.defaultValue);
  return result;

}

function getResetFormValue(formInfo: any) {
  const result: any = {};
  formInfo.forEach((v: any) => {
    const { type, key } = v;
    switch(v.type) {
      case 'Select':
      case 'Input':
        result[key] = '';
        break;
      case 'RangePicker':
        result[key] = '';
        break;
      default:
        break;
    }
  })
  return result;
}
const SearchCard = (props: Props) => {
  const { formInfo = DRAFT_FORM_INFO } = props; 
  const [formValue, setFormValue] = useState(setOpenInitialValue(formInfo));
  const [showAdvancedCard, setShowAdvancedCard] = useState(false);
  const [isFold, setIsFold] = useState(true);
  function advancedSearchOnclick() {
    setShowAdvancedCard(true);
    console.log('click筛选查询');
  }
  function barCodeSearchOnclick() {
    setShowAdvancedCard(false);
    console.log('click条码查询');
  }
  function confirmOnclick() {
    const fomatFormValue = { ...formValue };
    formInfo.forEach((v: any) => {
      if (v.type === 'RangePicker') {
        fomatFormValue[v.key] = fomatFormValue[v.key].map((v1: any) => new Date(v1._d));
      }
    })
    console.log('click查询', fomatFormValue);
  }
  function resetOnclick() {
    setFormValue(getResetFormValue(formInfo));
    console.log('click重置');
  }
  function formOnchange(value: any, key: any) {
    const newState = { ...formValue };
    newState[key] = value;
    setFormValue(newState)
  }
  function foldOnlick() {
    setIsFold(true);
    console.log('click折叠下箭头');
  }
  function unfoldOnlick() {
    setIsFold(false);
    console.log('click展开上箭头');
  }
  return (
    <Card className={props.classes.searchCard}>
      <CardContent>
        <Header
          isFold={isFold}
          foldOnlick={foldOnlick}
          unfoldOnlick={unfoldOnlick}
          classes={props.classes}
          advancedSearchOnclick={advancedSearchOnclick}
          barCodeSearchOnclick={barCodeSearchOnclick}
        />
        {!isFold && showAdvancedCard && <AdvancedSearchCard
          onChange={formOnchange}
          formInfo={formInfo}
          classes={props.classes}
          formValue={formValue}
        />}
        {!isFold && <Footer
          confirmOnclick={confirmOnclick}
          resetOnclick={resetOnclick}
        />}
      </CardContent>
    </Card>
  )
}

function mapStateToProps(state: any) {
  return {
    test: state.test,
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    doTest: (data: string) => dispatch(test(data)),
  }
}

const WrappedSearchCard = connect(mapStateToProps, mapDispatchToProps)(SearchCard);
export default WrappedSearchCard;


const titleInfo = {
  key: 'title',
  title: '标题',
  type: 'Input',
  options: [],
  defaultValue: '',
};

const typeInfo = {
  key: 'type',
  title: '类型',
  type: 'Select',
  options: ['命令'],
  defaultValue: '',
};

const documentIdInfo = {
  key: 'documentId',
  title: '文号',
  type: 'Input',
  options: [],
  defaultValue: '',
};

const securityLevelInfo = {
  key: 'securityLevel',
  title: '密级',
  type: 'Select',
  options: ['一般', '机密', '绝密'],
  defaultValue: '',
};

const recieveOrganizationInfo = {
  key: 'recieveOrganization',
  title: '收文单位',
  type: 'Input',
  options: [],
  defaultValue: '',
};

const handleStatusInfo = {
  key: 'handleStatus',
  title: '办理状态',
  type: 'Select',
  options: ['待处理', '办理中', '已办结'],
  defaultValue: '待处理',
};

const doneDateInfo = {
  key: 'doneDate',
  title: '办结日期',
  type: 'RangePicker',
  options: [],
  defaultValue: '',
};

const dateStatusInfo = {
  key: 'dateStatus',
  title: '是否逾期',
  type: 'Select',
  options: ['未逾期', '逾期'],
  defaultValue: '待处理',
};

const dispatchIdInfo = {
  key: 'dispatchId',
  title: '发文编号',
  type: 'Input',
  options: [],
  defaultValue: '',
};

const handleResultInfo = {
  key: 'handleResult',
  title: '办理结果',
  type: 'Select',
  options: ['通过', '驳回'],
  defaultValue: '',
};

const DISPATCH_FORM_INFO = [
  titleInfo,
  typeInfo,
  documentIdInfo,
  securityLevelInfo,
  recieveOrganizationInfo,
  handleStatusInfo,
  doneDateInfo,
  dateStatusInfo,
  dispatchIdInfo,
];

const AUDIT_DISPATCH_FORM_INFO = [
  titleInfo,
  typeInfo,
  documentIdInfo,
  securityLevelInfo,
  recieveOrganizationInfo,
  handleStatusInfo,
  doneDateInfo,
  dateStatusInfo,
  handleResultInfo,
];

const DRAFT_FORM_INFO = [
  titleInfo,
  typeInfo,
  documentIdInfo,
  securityLevelInfo,
  handleStatusInfo,
  doneDateInfo,
];