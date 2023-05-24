import { t } from 'i18next';

export const convertFirestoreError = (message: string): string => {
  let convertedMessage;
  switch (true) {
    case message.includes('internal-error'):
      convertedMessage = t('firestoreErrors.networkFailed');
      break;
    case message.includes('network-request-failed'):
      convertedMessage = t('firestoreErrors.networkFailed');
      break;
    case message.includes('email-already-in-use'):
      convertedMessage = t('firestoreErrors.accountExists');
      break;
    case message.includes('wrong-password'):
      convertedMessage = t('firestoreErrors.wrongPassword');
      break;
    case message.includes('user-not-found'):
      convertedMessage = t('firestoreErrors.noUser');
      break;
    default:
      convertedMessage = message;
      break;
  }
  return convertedMessage;
};
