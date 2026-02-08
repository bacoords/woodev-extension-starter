/**
 * Block editor component.
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function Edit() {
	const blockProps = useBlockProps( { className: 'woodev-toggle-block' } );

	return (
		<div { ...blockProps }>
			<button className="woodev-toggle-block__button" disabled>
				{ __( 'Show Content', 'woodev-extension-starter' ) }
			</button>
			<div className="woodev-toggle-block__content">
				<p>
					{ __(
						'This content is toggled by the Interactivity API. Click the button to hide it.',
						'woodev-extension-starter'
					) }
				</p>
			</div>
			<p className="woodev-toggle-block__editor-note">
				<em>
					{ __(
						'Toggle interaction works on the frontend.',
						'woodev-extension-starter'
					) }
				</em>
			</p>
		</div>
	);
}
