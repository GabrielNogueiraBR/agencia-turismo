'use client'

import React from 'react'
import { Icon } from '@chakra-ui/react'
import DataTable, { TableProps, createTheme } from 'react-data-table-component'
import { RiArrowDownSFill } from 'react-icons/ri'

createTheme('striped_color', {
  striped: {
    default: 'white',
  },
  background: {
    default: 'var(--chakra-colors-gray-200)',
  },
})

interface Props<T> extends TableProps<T> {}

function CustomDataTable<T>({ ...rest }: Props<T>) {
  return (
    <DataTable
      pagination
      responsive
      striped
      theme="striped_color"
      customStyles={{
        table: {
          style: {
            overflow: 'hidden',
          },
        },
        header: {
          style: {
            minHeight: '56px',
          },
        },
        headRow: {
          style: {
            // border: 'none',
            color: 'var(--chakra-colors-gray-900)',
            fontWeight: 700,
            fontSize: 'var(--chakra-fontSizes-md)',
          },
        },
        headCells: {
          style: {
            '&:not(:last-of-type)': {
              border: 'none',
            },
          },
        },
        cells: {
          style: {
            color: 'var(--chakra-colors-gray-600)',
            fontWeight: 600,
            fontSize: 'var(--chakra-fontSizes-md)',
            '&:not(:last-of-type)': {
              border: 'none',
            },
          },
        },
        rows: {
          style: {
            '&:not(:last-of-type)': {
              border: 'none',
            },
          },
          stripedStyle: {
            backgroundColor: 'white',
          },
        },
        pagination: {
          style: {
            backgroundColor: 'white',
            border: 'none',
          },
        },
      }}
      sortIcon={<Icon as={RiArrowDownSFill} ml="2" alignSelf="center" />}
      {...rest}
    />
  )
}

export default CustomDataTable
