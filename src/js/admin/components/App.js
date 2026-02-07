import { DataViews } from '@wordpress/dataviews/wp';
import { useState } from '@wordpress/element';
import { useItems } from '../hooks/useItems';
import { fields, actions } from '../config/itemConfig';

export default function App() {
    const [view, setView] = useState({
        type: 'table',
        perPage: 20,
        page: 1,
        sort: { field: 'date', direction: 'desc' },
        search: '',
        filters: [],
    });

    const { records, total, isLoading, refetch } = useItems(view);

    return (
        <DataViews
            data={records}
            fields={fields}
            view={view}
            onChangeView={setView}
            actions={actions(refetch)}
            paginationInfo={{ totalItems: total, totalPages: Math.ceil(total / view.perPage) }}
            isLoading={isLoading}
            getItemId={(item) => item.id}
            defaultLayouts={{ table: {}, grid: {} }}
        />
    );
}
