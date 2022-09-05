import { Space, Table, Tag, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import useAuthContext from 'src/hooks/useAuthContext';
import { loadLinksData } from 'src/services';

const baseUrl = 'http://79.143.31.216/s/'

interface IProps {
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
}

interface DataType {
  key: string;
  short: string;
  target: string;
  counter: number;
}

enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

const shortenLink = (value: string) =>  <a>{`${baseUrl}${value}`}</a>;

const columns: ColumnsType<DataType> = [
  {
    title: 'Short link',
    dataIndex: 'short',
    key: 'short',
    sorter: {
      multiple: 1
    },
    render: shortenLink,
  },
  {
    title: 'Target link',
    dataIndex: 'target',
    key: 'target',
    sorter: {
      multiple: 2
    },
  },
  {
    title: 'Used times',
    dataIndex: 'counter',
    key: 'counter',
    sorter: {
      multiple: 3
    },
  },
];

const LinksTable = ({ update, setUpdate }: IProps) => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<DataType[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await loadLinksData(token!);
      if (!response || response.error) {
        return;
      }

      const { data } = response;

      setContent(data);
      setPagination((prev) => ({ ...prev, total: data.length }));
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // no time for types...
  const handleChange = useCallback(async (pagination: any, _filter: any, sorter: any) => {
    console.log(sorter);
    let orderBy = ['asc_short'];

    if (Array.isArray(sorter)) {
      orderBy = sorter
        .map((elem) => {
          const field = elem.column.key ?? 'short';
          const order = elem.order === 'descend' ? OrderDirection.DESC : OrderDirection.ASC;
          
          return `${order}_${field}`;
        })
    } else {
      const field = sorter.column?.key ?? 'short';
      const order = sorter.order === 'descend' ? OrderDirection.DESC : OrderDirection.ASC;
      orderBy = [`${order}_${field}`];
    }
    

    try {
      setLoading(true);
      const response = await loadLinksData(token!, { ...pagination, orderBy });
      if (!response || response.error) {
        return;
      }

      const { data } = response;

      setContent(data);
      setPagination((prev) => ({ ...prev, ...pagination }));
    } finally {
      setLoading(false);
    }
  }, [token])

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData])

  useEffect(() => {
    if (update) {
      loadInitialData();
      setUpdate(false);
    }
  }, [update, setUpdate, loadInitialData])

  return (
    <Spin wrapperClassName='spinner' spinning={loading}>
      <Table columns={columns} dataSource={content} pagination={pagination} onChange={handleChange}  />
    </Spin>
  )
}

export default LinksTable;