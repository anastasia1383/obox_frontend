import { ToggleDots } from '@admin/assets/icons';
import { ActionMenu } from '@shared/components/atoms/ActionMenu';
import { Button } from '@shared/components/atoms/Button';
import { EntityState, WithEntityState } from '@shared/utils/types';
import { ActionButtonProps } from './types';
import './ActionButton.scss';
import { useMemo } from 'react';

export const ActionButton = <T extends WithEntityState>(
  props: ActionButtonProps<T>
) => {
  const { id, label, isSelected, onClick, entity, actions, variant } = props;
  const isDisabled = useMemo(() => {
    return entity.state === EntityState.DISABLED;
  }, [entity]);
  return (
    <div
      className={[
        'action-button d-inline-flex',
        isSelected ? 'active' : '',
        isDisabled ? 'disabled' : '',
      ].join(' ')}
    >
      <Button
        innerContent={label}
        variant={variant}
        className="action-button__start"
        onClick={() => {
          onClick(id);
        }}
      />
      <ActionMenu
        toggleContent={<ToggleDots />}
        toggleVariant={variant}
        entity={entity}
        actions={actions}
      />
    </div>
  );
};
