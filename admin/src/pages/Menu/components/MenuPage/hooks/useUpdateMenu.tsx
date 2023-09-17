import { useRequest } from '@admin/hooks';
import { Form, FormRef } from '@shared/components/atoms/Form';
import { Dialog } from '@shared/components/molecules/Dialog';
import { Menu } from '@shared/services';
import { UpdateMenuRequest, MenuService } from '@shared/services/MenuService';
import { useRef } from 'react';
import { useTranslation } from '@libs/react-i18next';
import { useMenuFormValidation } from '../validation/useMenuFormValidation';
import { FormInput } from '@shared/components/atoms/FormInput';
import { InputVariants } from '@shared/components/atoms/Input';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';

interface UpdateMenuParams {
  onSuccess: () => Promise<void>;
}

export const useUpdateMenu = (args: UpdateMenuParams) => {
  const { t } = useTranslation();
  const { validationSchema } = useMenuFormValidation();
  const { openDialog } = useDialog();
  const { onSuccess } = args;

  const updateSubmit = async ({ menu_id, name }: Menu) => {
    const id = menu_id;
    const request: UpdateMenuRequest = {
      name,
    };

    return MenuService.update(id, request);
  };

  const { execute: onUpdateSubmit } = useRequest({
    requestFunction: updateSubmit,
    onSuccess,
    onError: (error) => {
      throw error;
    },
  });

  const openMenuUpdateDialog = (menu: Menu) =>
    openDialog(({ closeDialog }) => {
      const formRef = useRef<FormRef<Partial<Menu>> | null>(null);
      const defaultValues: Menu = {
        ...menu,
      };

      return (
        <Dialog
          okCallback={() => {
            if (formRef.current) {
              formRef.current.submit();
            }
          }}
          cancelCallback={() => {
            closeDialog();
          }}
          title={t('menu:updateMenuForm.title')}
          size="lg"
          okText={t('common:buttons:confirm')}
          cancelText={t('common:buttons:cancel')}
        >
          <Form
            ref={formRef}
            defaultValues={defaultValues}
            validationSchema={validationSchema}
            onSubmit={async (data) => {
              await onUpdateSubmit(data as Menu);
            }}
          >
            <>
              <FormInput type={InputVariants.HIDDEN} name="restaurant_id" />
              <FormInput type={InputVariants.HIDDEN} name="language_code" />
              <FormInput
                placeholder={t('menu:createMenuForm.placeholder')}
                type={InputVariants.TEXT}
                name="name"
              />
            </>
          </Form>
        </Dialog>
      );
    });
  return {
    openMenuUpdateDialog,
  };
};