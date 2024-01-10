import { useRef, useState } from 'react';
import { ColorResult, ColorChangeHandler, ChromePicker} from 'react-color';
import { useTranslation } from '@libs/react-i18next';
import { useRequest } from '@admin/hooks';
import { Form, FormRef } from '@shared/components/atoms/Form';
import { Dialog } from '@shared/components/molecules/Dialog';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { Marks, MarksService } from '@shared/services';
import { CreateMarksResponse, CreateMarksRequest  } from '@shared/services/MarksService';
import { Input, InputVariants } from '@shared/components/atoms/Input';
import { InputLabel } from '@shared/components/atoms/InputLabel';
import { TitleForInput } from '@shared/components/atoms/TitleForInput';
import { formatAsRequired } from '@shared/helpers/formatAsRequired';
import { useMarksFormValidation } from '../validation/useMarksFormValidation';
import './ColorPicker.scss';

interface CreateMarksParams {
  onSuccess: (result: CreateMarksResponse) => Promise<void>;
  referenceType: string,
  language: string;
  restaurantId: string,
}

export const useCreateMarks = (args: CreateMarksParams) => {
  const { onSuccess, referenceType, language, restaurantId} = args;
  const { openDialog } = useDialog();
  const { t } = useTranslation();
  const { validationSchema } = useMarksFormValidation();

  const [currentColor, setCurrentColor]   = useState<string>('#792424');
  const handleOnChange: ColorChangeHandler = (color: ColorResult) => {
    setCurrentColor(color.hex);
  };

  const { execute: onCreateSubmit } = useRequest({
    requestFunction: MarksService.create,
    onSuccess,
    onError: (error) => {
      throw error;
    },
  });

  const openMarksCreateDialog = () => {
    openDialog(({ closeDialog }) => {
      const formRef = useRef<FormRef<Partial<Marks>> | null>(null);

      const defaultValues: CreateMarksRequest = {
        reference_type: referenceType,
        reference_id: restaurantId,
        name: '',
        language,
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
          title={t('tags:createMarksForm.title')}
          size="lg"
          okText={t('common:buttons:add')}
          cancelText={t('common:buttons:cancel')}
        >
          <Form
            ref={formRef}
            defaultValues={defaultValues}
            validationSchema={validationSchema}
            onSubmit={async (data) => {
              await onCreateSubmit(data as CreateMarksRequest);
            }}
          >
            <>
              <Input
                type={InputVariants.HIDDEN}
                name="reference_type"
              />
              <Input
                type={InputVariants.HIDDEN}
                name="restaurant_id"
              />
              <Input
                type={InputVariants.HIDDEN}
                name="language"
              />
              <InputLabel
                forInput="name"
                text={formatAsRequired(t('tags:createMarksForm.label'))}
              />
              <Input
                placeholder={t('tags:createMarksForm.placeholder')}
                type={InputVariants.TEXT}
                name="name"
              />
              <TitleForInput
                title={t('tags:createMarksForm.colorsTitle')}
                text={t('tags:createMarksForm.colorsText')}
              />
              <div>
                <ChromePicker  className="chrome-color-picker"
                  color={ currentColor  }
                  onChangeComplete={handleOnChange}
                  disableAlpha={true}
                  
                /> 
              </div>
              <TitleForInput
                title={t('tags:createMarksForm.emojiTitle')}
                text={t('tags:createMarksForm.emojiText')}
              />
              {/* Посмотри как дише сделан селект. Контролер в реакт хук форм, для передачи цвета в форму */}
            </>
          </Form>
        </Dialog>
      );
    });
  };
  return {
    openMarksCreateDialog,
  };
};