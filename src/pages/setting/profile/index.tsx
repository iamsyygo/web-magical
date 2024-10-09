import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Row, Col, Checkbox } from 'antd';

const dataSource = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
];

const Setting: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState(dataSource);
  const [editingRecord, setEditingRecord] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [searchAge, setSearchAge] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [autoSearch, setAutoSearch] = useState(false);
  const [filteredData, setFilteredData] = useState(dataSource);

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" onClick={() => handleDelete(record.key)}>
            删除
          </Button>
        </span>
      ),
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingRecord) {
        setData(data.map((item) => (item.key === editingRecord.key ? { ...item, ...values } : item)));
      } else {
        setData([...data, { ...values, key: data.length + 1 }]);
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingRecord(null);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingRecord(null);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    showModal();
  };

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
  };

  const handleSearchName = (e) => {
    setSearchName(e.target.value);
    if (autoSearch) {
      handleSearch();
    }
  };

  const handleSearchAge = (e) => {
    setSearchAge(e.target.value);
    if (autoSearch) {
      handleSearch();
    }
  };

  const handleSearchAddress = (e) => {
    setSearchAddress(e.target.value);
    if (autoSearch) {
      handleSearch();
    }
  };

  const handleSearch = () => {
    setFilteredData(
      data.filter((item) => {
        return (
          item.name.includes(searchName) &&
          item.age.toString().includes(searchAge) &&
          item.address.includes(searchAddress)
        );
      }),
    );
  };

  const handleReset = () => {
    setSearchName('');
    setSearchAge('');
    setSearchAddress('');
    setFilteredData(data);
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item label="姓名">
            <Input placeholder="搜索姓名" value={searchName} onChange={handleSearchName} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="年龄">
            <Input placeholder="搜索年龄" value={searchAge} onChange={handleSearchAge} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="地址">
            <Input placeholder="搜索地址" value={searchAddress} onChange={handleSearchAddress} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Button type="primary" onClick={handleSearch} className="mb-8px">
            查询
          </Button>
          <Button onClick={handleReset}>重置</Button>
        </Col>
      </Row>

      <Row justify="space-between" className="mb-6px">
        <Col>
          <Button type="primary" onClick={showModal} style={{ marginRight: 8 }}>
            新增
          </Button>
          <Checkbox checked={autoSearch} onChange={(e) => setAutoSearch(e.target.checked)}>
            自动搜索
          </Checkbox>
        </Col>
      </Row>
      <Table dataSource={filteredData} columns={columns} />
      <Modal
        title={editingRecord ? '编辑项目' : '新增项目'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="age" label="年龄" rules={[{ required: true, message: '请输入年龄!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="地址" rules={[{ required: true, message: '请输入地址!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Setting;
