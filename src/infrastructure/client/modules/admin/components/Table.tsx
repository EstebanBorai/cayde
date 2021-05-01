import tw, { styled } from 'twin.macro';

type RowButtonElementVariant = 'primary' | 'secondary' | 'danger' | 'warning';

const TableHead = styled.thead`
  ${tw`border-collapse table-auto w-full`}
  ${tw`bg-white relative`};
`;

const TableHeadRow = styled.tr`
  ${tw`text-left`};
`;

const TableHeadHeader = styled.th`
  ${tw`py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100`};
`;

const HeaderLabel = styled.label`
  ${tw`inline-flex justify-between items-center`};
  ${tw`px-2 py-2 rounded-lg uppercase text-sm text-gray-600`};
`;

const RowButtonElement = styled.button<{ variant: 'primary' | 'secondary' | 'danger' | 'warning' }>`
  ${tw`flex inline-flex justify-between uppercase mx-2 text-sm`};
  ${tw`items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer`};
  ${(props) => props.variant === 'primary' && tw`text-white bg-indigo-500 hover:bg-indigo-600`};
  ${(props) => props.variant === 'secondary' && tw`text-white bg-blue-500 hover:bg-blue-600`};
  ${(props) => props.variant === 'danger' && tw`text-white bg-red-500 hover:bg-red-600`};
  ${(props) => props.variant === 'warning' && tw`text-white bg-yellow-500 hover:bg-yellow-600`};

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

const Table = ({ children }: { children: JSX.Element | JSX.Element[]; }): JSX.Element => (
  <div className="bg-white rounded-lg shadow overflow-y-auto relative">
    <table className="border-collapse table-auto w-full bg-white table-striped relative">
      {children}
    </table>
  </div>
)

const Head = ({ children }: { children: JSX.Element | JSX.Element[]; }) => (
  <TableHead>
    <TableHeadRow>
      {children}
    </TableHeadRow>
  </TableHead>
);

const Header = ({ label }: { label: string; }): JSX.Element => (
  <TableHeadHeader>
    <HeaderLabel>
      {label}
    </HeaderLabel>
  </TableHeadHeader>
);

const EmptyHeader = (): JSX.Element => (
  <TableHeadHeader>
    <HeaderLabel>
      {' '}
    </HeaderLabel>
  </TableHeadHeader>
);

const Body = ({ children }: { children: JSX.Element | JSX.Element[]; }): JSX.Element => (
  <tbody className="overflow-x-auto">
    {children}
  </tbody>
);

const Row = ({ children }: { children: JSX.Element | JSX.Element[]; }): JSX.Element => (
  <tr>
    {children}
  </tr>
);

const Data = ({ text }: { text: string; }): JSX.Element => (
  <td className="border-dashed border-t border-gray-200">
    <span className="text-gray-700 px-6 py-3 flex items-center">
      {text}
    </span>
  </td>
);

const RowCell = ({ center, children }: { center?: boolean; children: JSX.Element | JSX.Element[]; }): JSX.Element => (
  <td className="border-dashed border-t border-gray-200">
    <span className={`text-gray-700 px-6 py-3 flex items-center${center ? ' justify-center' : ''}`}>
      {children}
    </span>
  </td>
);

const RowButton = ({ children, variant="secondary" }: { children: string | JSX.Element | JSX.Element[]; variant?: RowButtonElementVariant }): JSX.Element => (
  <RowButtonElement variant={variant}>
    {children}
  </RowButtonElement>
)

export default {
  EmptyHeader,
  Table,
  Head,
  Header,
  Body,
  Row,
  RowButton,
  Data,
  RowCell,
}
