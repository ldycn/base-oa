import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '../../../components/com-button';
import MaterialButton from '@material-ui/core/Button';
import { WithStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import { test } from '../../../Redux/actions/testActions';
import FormItem from '../../../components/com-form-item';
import { Input, Select, DatePicker } from 'antd';

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
};

interface AdvancedSearchCardProps extends WithStyles {
  formInfo: any,
  setValue: any,
  formValue: any,
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
      </Grid>
    </Grid>
  );
}

const makeFormItem = (props: any) => {
  const { formInfo, setValue, formValue } = props;
  const {key ,title, type, options } = formInfo;
  let component = <></>;
  switch (type) {
    case 'Input':
      component = (
        <FormItem key={title} title={title} xs={3}>
          <Input
            value={formValue[key]}
            onChange={(e) => {
              const data = e.target.value;
              setValue((oldState: any) => {
                const newState = { ...oldState };
                newState[key] = data;
                return newState;
              })}}
          />
        </FormItem>
      );
      break;
    case 'Select':
      component = (
        <FormItem key={title} title={title} xs={3}>
          <Select
            value={formValue[key]}
            style={{ width: '100%' }}
            onChange={(e) => setValue((oldState: any) => {
              const newState = JSON.parse(JSON.stringify(oldState));
              newState[key] = e;
              return newState;
            })}
          >
              {options.map((name: any) => <Option key={name} value={name}>{name}</Option>)}
            </Select>
        </FormItem>
      );
      break;
    case 'RangePicker':
      component = (
        <FormItem key={title} title={title} xs={6}>
          <RangePicker
            style={{ width: '100%' }}
            value={formValue[key]}
            onChange={(e) => setValue((oldState: any) => {
              const newState = JSON.parse(JSON.stringify(oldState));
              newState[key] = e;
              return newState;
            })}
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
        <Grid container direction='row' justify="flex-start" spacing={10}>
          {props.formInfo.map((v: any) => makeFormItem({
            setValue: props.setValue,
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
  const { formInfo = DISPATCH_FORM_INFO } = props; 
  const [formValue, setFormValue] = useState(setOpenInitialValue(formInfo));
  const [showAdvancedCard, setShowAdvancedCard] = useState(false);
  function advancedSearchOnclick() {
    setShowAdvancedCard(true);
    console.log('click筛选查询');
  }
  function barCodeSearchOnclick() {
    setShowAdvancedCard(false);
    console.log('click条码查询');
  }
  function searchConfirmOnclick() {
    const fomatFormValue = { ...formValue };
    formInfo.forEach((v: any) => {
      if (v.type === 'rangePicker') {
        fomatFormValue[v.key] = fomatFormValue[v.key].map((v1: any) => v1._d);
      }
    })
    console.log('click查询', fomatFormValue);
  }
  function searchResetOnclick() {
    setFormValue(getResetFormValue(formInfo));
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
        {showAdvancedCard && <AdvancedSearchCard
          setValue={setFormValue}
          formInfo={formInfo}
          classes={props.classes}
          formValue={formValue}
        />}
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




const DISPATCH_FORM_INFO = [{
  key: 'title',
  title: '标题',
  type: 'Input',
  options: [],
  defaultValue: '',
}, {
  key: 'type',
  title: '类型',
  type: 'Select',
  options: ['命令'],
  defaultValue: '',
}, {
  key: 'documentId',
  title: '文号',
  type: 'Input',
  options: [],
  defaultValue: '',
}, {
  key: 'securityLevel',
  title: '密级',
  type: 'Select',
  options: ['一般', '机密', '绝密'],
  defaultValue: '',
}, {
  key: 'recieveOrganization',
  title: '收文单位',
  type: 'Input',
  options: [],
  defaultValue: '',
}, {
  key: 'handleStatus',
  title: '办理状态',
  type: 'Select',
  options: ['待处理', '办理中', '已办结'],
  defaultValue: '待处理',
}, {
  key: 'doneDate',
  title: '办结日期',
  type: 'RangePicker',
  options: [],
  defaultValue: '',
}, {
  key: 'dateStatus',
  title: '是否逾期',
  type: 'Select',
  options: ['未逾期', '逾期'],
  defaultValue: '待处理',
}, {
  key: 'dispatchId',
  title: '发文编号',
  type: 'Input',
  options: [],
  defaultValue: '',
}];
