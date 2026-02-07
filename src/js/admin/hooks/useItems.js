import { useState, useEffect, useCallback } from '@wordpress/element';

export function useItems( view ) {
	const [ records, setRecords ] = useState( [] );
	const [ total, setTotal ] = useState( 0 );
	const [ isLoading, setIsLoading ] = useState( true );
	const [ refreshKey, setRefreshKey ] = useState( 0 );

	const refetch = useCallback( () => setRefreshKey( ( k ) => k + 1 ), [] );

	useEffect( () => {
		setIsLoading( true );

		const url = new URL( `${ window.woodevStarterTool.restUrl }items` );
		url.searchParams.set( 'page', view.page );
		url.searchParams.set( 'per_page', view.perPage );

		fetch( url.toString(), {
			headers: { 'X-WP-Nonce': window.woodevStarterTool.nonce },
		} )
			.then( ( r ) => {
				setTotal( parseInt( r.headers.get( 'X-WP-Total' ) || '0', 10 ) );
				return r.json();
			} )
			.then( setRecords )
			.finally( () => setIsLoading( false ) );
	}, [ view.page, view.perPage, refreshKey ] );

	return { records, total, isLoading, refetch };
}
