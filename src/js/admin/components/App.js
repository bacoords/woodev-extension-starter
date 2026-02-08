/**
 * Main App component with tab navigation.
 *
 * Uses WordPress TabPanel for navigation between views.
 */
import { TabPanel } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useNavigation } from '../hooks/useNavigation';
import PagesView from './views/PagesView';
import SettingsView from './views/SettingsView';

export default function App() {
	const { currentView, handleTabSelect, VIEWS } = useNavigation();

	const tabs = [
		{
			name: VIEWS.PAGES,
			title: __( 'Pages', 'woodev-extension-starter' ),
			content: <PagesView />,
		},
		{
			name: VIEWS.SETTINGS,
			title: __( 'Settings', 'woodev-extension-starter' ),
			content: <SettingsView />,
		},
	];

	return (
		<div className="woodev-starter-app">
			<TabPanel
				tabs={ tabs }
				initialTabName={ currentView }
				onSelect={ handleTabSelect }
			>
				{ ( { content } ) => (
					<div className="woodev-starter-tab-content">
						{ content }
					</div>
				) }
			</TabPanel>
		</div>
	);
}
