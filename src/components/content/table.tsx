import { ReactNode, useState, Fragment } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown, Download } from 'lucide-react';

// Base table types
export interface Column {
  key: string;
  header: string | ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: any, row: any) => ReactNode;
}

export interface TableProps {
  columns: Column[];
  data: any[];
  variant?: 'default' | 'striped' | 'bordered' | 'compact' | 'clinical';
  stickyHeader?: boolean;
  sortable?: boolean;
  hoverable?: boolean;
  caption?: string;
  tableNumber?: string;
  credit?: string;
  zebra?: boolean;
  headerColor?: string;
}

export function Table({
  columns,
  data,
  variant = 'default',
  stickyHeader = false,
  sortable = false,
  hoverable = true,
  caption,
  tableNumber,
  credit,
  zebra = true,
  headerColor = 'bg-blue-600',
}: TableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const variantStyles = {
    default: {
      container: 'bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm',
      header: `${headerColor} text-white`,
      headerCell: 'px-4 py-3 text-left',
      row: 'border-b border-slate-200 last:border-0',
      cell: 'px-4 py-3',
      zebraOdd: 'bg-white',
      zebraEven: 'bg-slate-50',
    },
    striped: {
      container: 'bg-white rounded-lg border border-slate-200 overflow-hidden',
      header: `${headerColor} text-white`,
      headerCell: 'px-4 py-3 text-left',
      row: '',
      cell: 'px-4 py-3',
      zebraOdd: 'bg-white',
      zebraEven: 'bg-blue-50',
    },
    bordered: {
      container: 'bg-white rounded-lg border-2 border-slate-300 overflow-hidden',
      header: 'bg-slate-100 border-b-2 border-slate-300',
      headerCell: 'px-4 py-3 text-left border-r border-slate-300 last:border-0',
      row: 'border-b border-slate-300 last:border-0',
      cell: 'px-4 py-3 border-r border-slate-300 last:border-0',
      zebraOdd: 'bg-white',
      zebraEven: 'bg-slate-50',
    },
    compact: {
      container: 'bg-white rounded border border-slate-200 overflow-hidden text-sm',
      header: `${headerColor} text-white`,
      headerCell: 'px-3 py-2 text-left',
      row: 'border-b border-slate-200 last:border-0',
      cell: 'px-3 py-2',
      zebraOdd: 'bg-white',
      zebraEven: 'bg-slate-50',
    },
    clinical: {
      container: 'bg-white rounded-xl border border-slate-200 overflow-hidden shadow-md',
      header: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white',
      headerCell: 'px-6 py-4 text-left',
      row: 'border-b border-slate-200 last:border-0',
      cell: 'px-6 py-4',
      zebraOdd: 'bg-white',
      zebraEven: 'bg-blue-50/50',
    },
  };

  const styles = variantStyles[variant];

  const handleSort = (key: string) => {
    if (!sortable) return;
    
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data];
  if (sortConfig) {
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  return (
    <div className="my-8">
      {(caption || tableNumber) && (
        <div className="mb-3 px-2">
          <div className="flex gap-3">
            {tableNumber && (
              <span className="flex-shrink-0 px-3 py-1 bg-green-600 text-white text-sm rounded-md h-fit">
                Table {tableNumber}
              </span>
            )}
            {caption && (
              <div className="flex-1">
                <p className="text-slate-700 leading-relaxed">{caption}</p>
                {credit && (
                  <p className="text-slate-500 text-sm mt-1 italic">{credit}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className={styles.container}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${styles.header} ${stickyHeader ? 'sticky top-0 z-10' : ''}`}>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={styles.headerCell}
                    style={{ 
                      width: column.width,
                      textAlign: column.align || 'left',
                      cursor: column.sortable || sortable ? 'pointer' : 'default',
                    }}
                    onClick={() => (column.sortable || sortable) && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2">
                      {column.header}
                      {(column.sortable || sortable) && (
                        <span className="text-white/70">
                          {sortConfig?.key === column.key ? (
                            sortConfig.direction === 'asc' ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown size={16} />
                            )
                          ) : (
                            <ChevronsUpDown size={16} />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`
                    ${styles.row}
                    ${zebra ? (rowIndex % 2 === 0 ? styles.zebraOdd : styles.zebraEven) : ''}
                    ${hoverable ? 'hover:bg-blue-100/50 transition-colors' : ''}
                  `}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={styles.cell}
                      style={{ textAlign: column.align || 'left' }}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Comparison table with highlighted differences
interface ComparisonTableProps {
  leftHeader: string;
  rightHeader: string;
  rows: Array<{
    label: string;
    left: ReactNode;
    right: ReactNode;
    highlight?: 'left' | 'right' | 'both';
  }>;
  tableNumber?: string;
  caption?: string;
  credit?: string;
}

export function ComparisonTable({
  leftHeader,
  rightHeader,
  rows,
  tableNumber,
  caption,
  credit,
}: ComparisonTableProps) {
  return (
    <div className="my-8">
      {(caption || tableNumber) && (
        <div className="mb-3 px-2">
          <div className="flex gap-3">
            {tableNumber && (
              <span className="flex-shrink-0 px-3 py-1 bg-green-600 text-white text-sm rounded-md h-fit">
                Table {tableNumber}
              </span>
            )}
            {caption && (
              <div className="flex-1">
                <p className="text-slate-700 leading-relaxed">{caption}</p>
                {credit && (
                  <p className="text-slate-500 text-sm mt-1 italic">{credit}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="bg-slate-100 px-4 py-3 text-left w-1/4 border-r border-slate-200">
                  Category
                </th>
                <th className="bg-blue-100 px-4 py-3 text-left border-r border-slate-200">
                  {leftHeader}
                </th>
                <th className="bg-green-100 px-4 py-3 text-left">
                  {rightHeader}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="border-t border-slate-200">
                  <td className="px-4 py-3 bg-slate-50 border-r border-slate-200">
                    {row.label}
                  </td>
                  <td
                    className={`px-4 py-3 border-r border-slate-200 ${
                      row.highlight === 'left' || row.highlight === 'both'
                        ? 'bg-blue-50 ring-2 ring-inset ring-blue-300'
                        : ''
                    }`}
                  >
                    {row.left}
                  </td>
                  <td
                    className={`px-4 py-3 ${
                      row.highlight === 'right' || row.highlight === 'both'
                        ? 'bg-green-50 ring-2 ring-inset ring-green-300'
                        : ''
                    }`}
                  >
                    {row.right}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Responsive card table for mobile
interface ResponsiveTableProps {
  columns: Column[];
  data: any[];
  tableNumber?: string;
  caption?: string;
  credit?: string;
  breakpoint?: 'sm' | 'md' | 'lg';
}

export function ResponsiveTable({
  columns,
  data,
  tableNumber,
  caption,
  credit,
  breakpoint = 'md',
}: ResponsiveTableProps) {
  const breakpointClass = {
    sm: 'sm:table',
    md: 'md:table',
    lg: 'lg:table',
  };

  return (
    <div className="my-8">
      {(caption || tableNumber) && (
        <div className="mb-3 px-2">
          <div className="flex gap-3">
            {tableNumber && (
              <span className="flex-shrink-0 px-3 py-1 bg-green-600 text-white text-sm rounded-md h-fit">
                Table {tableNumber}
              </span>
            )}
            {caption && (
              <div className="flex-1">
                <p className="text-slate-700 leading-relaxed">{caption}</p>
                {credit && (
                  <p className="text-slate-500 text-sm mt-1 italic">{credit}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Desktop table view */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className={`w-full hidden ${breakpointClass[breakpoint]}`}>
            <thead className="bg-blue-600 text-white">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-4 py-3 text-left"
                    style={{ width: column.width }}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`border-b border-slate-200 last:border-0 ${
                    rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                  }`}
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3">
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile card view */}
          <div className={`${breakpointClass[breakpoint]} space-y-4 p-4`}>
            {data.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="bg-slate-50 rounded-lg p-4 border border-slate-200"
              >
                {columns.map((column) => (
                  <div key={column.key} className="mb-3 last:mb-0">
                    <p className="text-slate-600 text-sm mb-1">{column.header}</p>
                    <div className="text-slate-900">
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Expandable table rows
interface ExpandableTableProps {
  columns: Column[];
  data: Array<{
    main: any;
    expanded: ReactNode;
  }>;
  tableNumber?: string;
  caption?: string;
  credit?: string;
}

export function ExpandableTable({
  columns,
  data,
  tableNumber,
  caption,
  credit,
}: ExpandableTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (index: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className="my-8">
      {(caption || tableNumber) && (
        <div className="mb-3 px-2">
          <div className="flex gap-3">
            {tableNumber && (
              <span className="flex-shrink-0 px-3 py-1 bg-green-600 text-white text-sm rounded-md h-fit">
                Table {tableNumber}
              </span>
            )}
            {caption && (
              <div className="flex-1">
                <p className="text-slate-700 leading-relaxed">{caption}</p>
                {credit && (
                  <p className="text-slate-500 text-sm mt-1 italic">{credit}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 w-12"></th>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-4 py-3 text-left"
                    style={{ width: column.width }}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <Fragment key={rowIndex}>
                  <tr
                    className={`border-b border-slate-200 cursor-pointer hover:bg-blue-50 transition-colors ${
                      rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                    }`}
                    onClick={() => toggleRow(rowIndex)}
                  >
                    <td className="px-4 py-3 text-center">
                      {expandedRows.has(rowIndex) ? (
                        <ChevronUp size={18} className="text-blue-600" />
                      ) : (
                        <ChevronDown size={18} className="text-slate-400" />
                      )}
                    </td>
                    {columns.map((column) => (
                      <td key={column.key} className="px-4 py-3">
                        {column.render
                          ? column.render(row.main[column.key], row.main)
                          : row.main[column.key]}
                      </td>
                    ))}
                  </tr>
                  {expandedRows.has(rowIndex) && (
                    <tr className="bg-blue-50 border-b border-slate-200">
                      <td></td>
                      <td colSpan={columns.length} className="px-4 py-4">
                        {row.expanded}
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Helper component for bullet lists in cells
export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// Helper component for percentage badges
export function PercentageBadge({ value, label }: { value: string | number; label?: string }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
        {value}%
      </span>
      {label && <span className="text-slate-600">{label}</span>}
    </div>
  );
}