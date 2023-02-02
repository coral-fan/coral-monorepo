import { getCollectionReferenceServerSide } from 'libraries/firebase';

const REWARD_ID = 'jMTrwJegcqqRN2irEffl';

const selectWinner = async () => {
  const participantsCollectionRef = await getCollectionReferenceServerSide(
    `rewards/${REWARD_ID}/participants`
  );

  const participantsQuerySnapshot = await participantsCollectionRef.get();

  const participants = participantsQuerySnapshot.docs.map(
    (participantsDocSnapshot) => participantsDocSnapshot.id
  );

  const randomParticipantIndex = Math.floor(Math.random() * participants.length);

  const winnerId = participants[randomParticipantIndex];

  const socialShareTransactionsCollectionRef = await getCollectionReferenceServerSide(
    'social-share-transactions'
  );

  const shareTransactionsQuerySnapshot = await socialShareTransactionsCollectionRef
    .where('userId', '==', winnerId)
    .get();

  const shareTransactionDocsSnapshot = shareTransactionsQuerySnapshot.docs;

  for (const shareTransactionDocSnapshot of shareTransactionDocsSnapshot) {
    const shareTransaction = shareTransactionDocSnapshot.data();
    if (shareTransaction.url) {
      const username = new URL(shareTransaction.url).pathname.split('/')[1];
      console.log(username);
      break;
    }
  }
};

selectWinner().catch((e: Error) => console.error(e, '\n'));
