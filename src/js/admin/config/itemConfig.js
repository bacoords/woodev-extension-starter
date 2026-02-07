import { trash, edit } from '@wordpress/icons';
import { Button, Flex } from '@wordpress/components';

export const fields = [
    {
        id: 'name',
        label: 'Name',
        type: 'text',
        enableHiding: false,
        enableSorting: true,
        getValue: (item) => item.name,
    },
    {
        id: 'status',
        label: 'Status',
        type: 'text',
        enableHiding: true,
        render: ({ item }) => (
            <span className={`status-${item.status}`}>{item.status}</span>
        ),
    },
];

export const actions = (onRefresh) => [
    {
        id: 'edit',
        label: 'Edit',
        icon: edit,
        callback: (items) => console.log('Edit', items[0]),
    },
    {
        id: 'delete',
        label: 'Delete',
        icon: trash,
        isDestructive: true,
        supportsBulk: true,
        RenderModal: ({ items, closeModal }) => {
            const handleDelete = async () => {
                // Delete logic here
                onRefresh();
                closeModal();
            };

            return (
                <div>
                    <p>Delete {items.length} item(s)?</p>
                    <Flex justify="flex-end" gap={2}>
                        <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                        <Button variant="primary" isDestructive onClick={handleDelete}>Delete</Button>
                    </Flex>
                </div>
            );
        },
    },
];
