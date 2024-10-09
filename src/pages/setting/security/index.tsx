import { TableWithFilterable } from '@/components/table-with-filterable';
function getDataList(params) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: Array.from({ length: 10 }).map((_, index) => ({
          key: index,
          name: `name${index}`,
          age: 32,
          address: `New York No. ${index} Lake Park`,
        })),
        total: 100,
      });
    }, 1000);
  });
}

const Setting: React.FC = () => {
  return (
    <div className="text-10 w-full h-full">
      <TableWithFilterable
        requestApi={getDataList}
        search={{
          spans: { sm: 6, md: 6, lg: 6, xl: 6, xxl: 8 },
          items: [
            { key: 'name', label: '姓名', type: 'input' },
            { key: 'age', label: '年龄', type: 'input' },
            { key: 'address', label: '地址', type: 'input' },
          ],
        }}
        table={{
          columns: [
            { title: '姓名', dataIndex: 'name', key: 'name' },
            { title: '年龄', dataIndex: 'age', key: 'age' },
            { title: '地址', dataIndex: 'address', key: 'address' },
          ],
        }}
      ></TableWithFilterable>
    </div>
  );
};

export default Setting;
