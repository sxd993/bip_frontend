export const ProfileSidebarField = ({ label, children, highlight = false }) => (
  <div>
    <dt className="text-[0.6875rem] font-medium text-text-muted sm:text-xs">{label}</dt>
    <dd
      className={[
        'mt-0.5 text-sm break-words sm:text-base lg:text-sm',
        highlight ? 'font-semibold text-primary' : 'text-text',
      ].join(' ')}
    >
      {children}
    </dd>
  </div>
);
