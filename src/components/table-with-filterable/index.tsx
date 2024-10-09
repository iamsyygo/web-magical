// TableWithFilterable

import { Button, Checkbox, Col, Form, Input, Row, Table } from 'antd';
import type { ColProps, TableProps } from 'antd';
import type { AnyObject } from 'antd/es/_util/type';
import { useCallback, useState } from 'react';

type ColSpanType = number | string;
type GridColumnSize =
  | ColSpanType
  | { xs?: ColSpanType; sm?: ColSpanType; md?: ColSpanType; lg?: ColSpanType; xl?: ColSpanType; xxl?: ColSpanType };

type SearchItemType = {
  label?: string | React.ReactNode;
  key: string;
  span?: GridColumnSize;
  type?: 'input' | 'select' | 'date' | 'range' | 'cascader';
  props?: Record<string, unknown>;
};

interface SearchParams {
  query: Record<string, unknown>;
  page: number;
  pageSize: number;
}

interface DataResult {
  total: number;
  data: unknown[];
}

function getColProps(spans: GridColumnSize = {}): ColProps {
  const colProps: ColProps = {};
  if (typeof spans === 'string' || typeof spans === 'number') {
    colProps.span = spans;
  } else {
    Object.assign(colProps, spans);
  }
  return colProps;
}

function createSearchFieldsWithCol(search: TableWithFilterableProps['search']) {
  const { items = [], spans = {} } = search;
  const globalColProps = getColProps(spans);

  return items.map((item) => {
    const { label, key, span, type = 'input', props } = item;
    const colProps = Object.assign({}, globalColProps, span && getColProps(span));
    return (
      <Col key={key} {...colProps}>
        <Form.Item label={label}>{type === 'input' && <Input placeholder={`搜索${label}`} {...props} />}</Form.Item>
      </Col>
    );
  });
}

interface TableWithFilterableProps {
  children?: React.ReactNode;
  search: {
    items?: SearchItemType[];
    spans?: GridColumnSize;
    gutter?: number;
  };
  table: Omit<TableProps, 'dataSource'>;
  requestApi: (params: SearchParams) => Promise<DataResult>;
}

export const TableWithFilterable: React.FC<TableWithFilterableProps> = (props) => {
  const { children, search, table, requestApi } = props;

  const [dataResult, setDataResult] = useState<DataResult>({
    data: [],
    total: 0,
  });

  const onsearch = useCallback(() => {
    // do something
  }, []);
  const onreset = useCallback(() => {
    // do something
  }, []);

  // const [autoSearch, setAutoSearch] = useState(false);

  const getTableData = useCallback(
    (params: SearchParams) => {
      requestApi(params).then((result) => {
        setDataResult(result);
      });
    },
    [requestApi],
  );

  return (
    <div>
      <Row gutter={search.gutter || 16}>
        {createSearchFieldsWithCol(search)}
        <Col span={6}>
          <Button type="primary" onClick={onsearch} className="mr-8px">
            查询
          </Button>
          <Button onClick={onreset}>重置</Button>
        </Col>
      </Row>

      <Row justify="space-between" className="mb-6px">
        <Col span={24}>
          {/* <Button type="primary" onClick={showModal} style={{ marginRight: 8 }}>
            新增
          </Button>
          <Checkbox checked={autoSearch} onChange={(e) => setAutoSearch(e.target.checked)}>
            自动搜索
          </Checkbox> */}
        </Col>
      </Row>
      <Table dataSource={dataResult.data as readonly AnyObject[]} {...table} />
    </div>
  );
};
