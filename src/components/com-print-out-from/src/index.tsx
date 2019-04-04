import React, { useState } from 'react';
import { Row, Select, Button as AntButton } from 'antd';
import Grid from '@material-ui/core/Grid';
import InsertLink from '@material-ui/icons/InsertLink';
import { WithStyles } from '@material-ui/core/styles';
const { Option } = Select;

type NameBlock = {
  width: string,
  name: string,
}

type ContentBlock = {
  width: string,
  key: string,
  type: string,
  options: string[],
  defaultValue: string,
}

type BlockInfo = NameBlock | ContentBlock;
const getIsContentBlock = (blockInfo: BlockInfo): blockInfo is ContentBlock => !!(blockInfo as ContentBlock).key;

type FormInfo = {
  height: number,
  blocks: BlockInfo[],
}[]

type BoxProps = {
  children: JSX.Element,
  style: object,
}

type FormItem = {
  formInfo: FormInfo,
  lineIndex: number,
  blockIndex: number,
  onChange: (value: string, key: string) => void,
  formValue: any,
}

type FormLine = {
  formInfo: FormInfo,
  lineIndex: number,
  onChange: (value: string, key: string) => void,
  formValue: any,
}

type MakeFormContent = {
  unitKey: string,
  type: string,
  options: Array<string>,
  formValue: any,
  onChange: (value: string, key: string) => void,
}

interface PrintOutForm extends WithStyles {
  formInfo: FormInfo,
}

const UNDERLINE_AND_BOADER_COLOR = '#000000';
const UNDERLINE_AND_BOADER_WIDTH = 1;

// 获取该表格框边缘位置上的边
const getBoldPositions = (formInfo: FormInfo, [lineIndex, BlockIndex]: [number, number]) => {
  const lineCount = formInfo.length;
  const blockCount = formInfo[lineIndex].blocks.length;
  const result = [];
  if (lineIndex === 0) {
    result.push('top');
  }
  if (lineIndex === lineCount - 1) {
    result.push('bottom');
  }
  if (BlockIndex === 0) {
    result.push('left');
  }
  if (BlockIndex === blockCount - 1) {
    result.push('right');
  }

  return result;
};

// 生成额外加粗边的样式代码
const getBoldStyles = (formInfo: FormInfo, [lineIndex, BlockIndex]: [number, number]) => {
  const boldPositions = getBoldPositions(formInfo, [lineIndex, BlockIndex]);
  const result: any = {};
  boldPositions.forEach((position: string) =>
    result[`border${position[0].toLocaleUpperCase()}${position.slice(1)}`] = `${UNDERLINE_AND_BOADER_WIDTH* 2}px solid ${UNDERLINE_AND_BOADER_COLOR}`);
  return result;
}
const Box = ({ children, style }: BoxProps) => (
  <div style={{ padding: '20px', border: `1px solid ${UNDERLINE_AND_BOADER_COLOR}`, float: 'left', ...style }}>
    <Row type='flex' justify='center' align='middle' style={{ height: '100%' }}>
      {children}
    </Row>
  </div>
);

const FormContent = (props: MakeFormContent) => {
  const { unitKey: key, type, options, formValue, onChange } = props;
  let component = <></>;
  switch (type) {
    case 'Input':
      component = <textarea
        cols={5}
        rows={2}
        style={{ outline: 0, background: 'none', border:'0px', borderBottom: '1px', resize: 'none', width: '100%', height: '100%' }}
        value={formValue[key]}
        onChange={(e: any) => onChange(e.target.value, key)}
      />;
      break;
    case 'Select':
      component = <Select
        value={formValue[key]}
        style={{ width: '100%' }}
        onChange={(e: any) => onChange(e, key)}
      >
        {options.map((name: string) => <Option key={name} value={name}>{name}</Option>)}
      </Select>;
      break;
    default:
      break;
  }
  return component
}

const FormItem = (props: FormItem) => {
  const { formInfo, lineIndex, blockIndex, onChange, formValue } = props;
  const blockInfo = formInfo[lineIndex].blocks[blockIndex];
  return (
    <Box
      key={blockIndex}
      style={{ width: blockInfo.width, height: '100%', ...getBoldStyles(formInfo, [lineIndex, blockIndex]) }}
    >
      {getIsContentBlock(blockInfo) ? <FormContent
        unitKey={blockInfo.key}
        type={blockInfo.type}
        options={blockInfo.options}
        formValue={formValue}
        onChange={onChange}
      />
        :
        <p key={blockInfo.name}>{blockInfo.name}</p>}
    </Box>)
}

const FormLine = ({ formInfo, lineIndex, onChange, formValue }: FormLine) => (
  <div style={{ height: `${formInfo[lineIndex].height}px` }}>
    {formInfo[lineIndex].blocks.map((blockInfo: BlockInfo, index) => <FormItem
      key={getIsContentBlock(blockInfo) ? blockInfo.key : blockInfo.name}
      formInfo={formInfo}
      lineIndex={lineIndex}
      blockIndex={index}
      onChange={onChange}
      formValue={formValue}
    />)}
  </div>
)

function setOpenInitialValue(formValue: any) {
  const result: any = {};
  formValue.forEach((v: BlockInfo) => {
    if (getIsContentBlock(v)) {
      result[v.key] = v.defaultValue;
    }
  });
  return result;
}

type ButtonsProps = {
  saveOnclick: () => void,
  submitOnclick: () => void,
}
const Buttons = ({ saveOnclick, submitOnclick }: ButtonsProps) => (
  <Grid container spacing={2} style={{ margin: '8px' }}>
    <Grid item>
      <AntButton type='primary' onClick={saveOnclick}>
        保存
      </AntButton>
    </Grid>
    <Grid item>
      <AntButton type='primary' onClick={submitOnclick}>
        提交
      </AntButton>
    </Grid>
  </Grid>
)

interface Attachment extends WithStyles {
  addAttachment: (name: string) => void,
  attachments: string[]
}
const Attachment = ({ classes, addAttachment, attachments }: Attachment) => (
  <Grid container spacing={1} >
    <Grid item>
      <InsertLink />
    </Grid>
    <Grid item>
      <span>附件</span>
    </Grid>
    <Grid item>
      |
    </Grid>
    <Grid item>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(e: any) => addAttachment(e.currentTarget.files[0].name)}
      />
      <label htmlFor="contained-button-file">
        立即上传
      </label>
    </Grid>
    <Grid container spacing={1} direction="row" justify="flex-start" alignItems="center">
      {attachments.map((v: string) => <Grid item key={`v${Math.random()}`}>{v}</Grid>)}
    </Grid>
  </Grid>
)

// 生成每行宽度一样，每行表格数不固定的表格
const PrintOutForm = ({ formInfo = topFormData, classes }: PrintOutForm) => {
  const formHeight = formInfo.reduce((result, v) => v.height + result, 0);
  const [formValue, setFormValue] = useState(setOpenInitialValue(formInfo));
  const noAttachment: string[] = [];
  const [attachments, setAttachment] = useState(noAttachment);
  function onChange(value: string, key: string) {
    console.log(`form onChange, key = ${key}, value=${value}`);
    const newState = { ...formValue };
    newState[key] = value;
    setFormValue(newState)
  }
  function saveOnclick() {
    console.log(`click保存`, formValue);
  }
  function submitOnclick() {
    console.log(`click提交`, formValue);
  }
  function addAttachment(name: string) {
    setAttachment([...attachments, name]);
    console.log(name);
  }
  return (
    <>
      <Buttons saveOnclick={saveOnclick} submitOnclick={submitOnclick} />
      <div style={{ height: `${formHeight}px` }}>
        {formInfo.map((lineInfo, index) => <FormLine
          key={index}
          formInfo={formInfo}
          lineIndex={index}
          onChange={onChange}
          formValue={formValue}
        />)}
      </div>
      <Attachment classes={classes} addAttachment={addAttachment} attachments={attachments} />
    </>
  );
}

export default PrintOutForm;

const topFormData = [{
  height: 100,
  blocks: [{
    width: '11%',
    name: '字号',
  }, {
    width: '23%',
    key: 'documentId',
    type: 'Select',
    options: ['1123', '241234'],
    defaultValue: '',
  }, {
    width: '11%',
    name: '类型',
  }, {
    width: '22%',
    key: 'type',
    type: 'Select',
    options: ['2d', 'f2'],
    defaultValue: '',
  }, {
    width: '11%',
    name: '密级',
  }, {
    width: '22%',
    key: 'secretLevel',
    type: 'Select',
    options: ['2df32', 'f2f23f2'],
    defaultValue: '',
  }],
}, {
  height: 100,
  blocks: [{
    width: '11%',
    name: '标题',
  }, {
    width: '89%',
    key: 'title',
    type: 'Input',
    options: ['2df32', 'f2f23f2'],
    defaultValue: '',
  }],
}, {
  height: 100,
  blocks: [{
    width: '11%',
    name: '收文单位',
  }, {
    width: '89%',
    key: 'recieveOrganization',
    type: 'Select',
    options: ['对', '1f'],
    defaultValue: '',
  }],
}, {
  height: 100,
  blocks: [{
    width: '11%',
    name: '抄送单位',
  }, {
    width: '89%',
    key: 'copyOrganization',
    type: 'Select',
    options: ['对', '1f'],
    defaultValue: '',
  }],
}, {
  height: 100,
  blocks: [{
    width: '11%',
    name: '备注',
  }, {
    width: '39%',
    key: 'remark',
    type: 'Select',
    options: ['对', '1f'],
    defaultValue: '',
  }, {
    width: '11%',
    name: '打印份数',
  }, {
    width: '39%',
    key: 'copyCount',
    type: 'Select',
    options: ['对', '1f'],
    defaultValue: '',
  }],
}];