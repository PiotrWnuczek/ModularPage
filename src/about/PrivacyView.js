import React from 'react';
import { Box } from '@mui/material';
import BasicLayout from 'about/BasicLayout';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const privacyEn = `
  ### Privacy policy

  In this document you will find the rules for the processing of personal data and the use of cookies in connection with the use of the modularpage.com website.

  The website administrator is Piotr Wnuczek.

  In case of any doubts related to the privacy policy, you can contact us at any time by sending a message to the address contact@piotrwnuczek.pl.

  #### The most important information

  By subscribing to the newsletter or contacting us, you provide us with your personal data, and we guarantee that your data will remain confidential, secure and will not be disclosed to any third parties without your express consent.

  We entrust the processing of personal data only to verified and trusted entities providing services related to the processing of personal data.

  We use Google Analytics analytical tools that collect information about your website visits, such as the subpages you have displayed, the time you spent on the website or the transitions between individual subpages. For this purpose, Google LLC cookies are used for the Google Analytics service.

  #### Security

  We guarantee the confidentiality of all personal data provided to us. We ensure that all security and personal data protection measures required by the provisions on the protection of personal data are taken. Personal data is collected with due diligence and properly protected against access by unauthorized persons.

  #### List of assignments

  We entrust the processing of personal data to UAB Sender.lt, located at Perkūnkiemio 4A, Vilnius, Lithuania - in order to use the mailing system in which your data is processed, if you subscribed to the newsletter.

  All entities entrusted with the processing of personal data guarantee the application of appropriate measures for the protection and security of personal data required by law.

  #### Newsletter

  If you want to subscribe to the newsletter, you must provide us with your e-mail address via the newsletter subscription form.

  The data provided to us when subscribing to the newsletter is used to send you the newsletter, and the legal basis for their processing is your consent expressed when subscribing to the newsletter.

  The data is processed as part of the MailerLite mailing system and stored on a server provided by MailerLite.

  The data will be processed for the duration of the newsletter, unless you unsubscribe earlier, which will delete your data from the database.

  You can correct your data stored in the newsletter database at any time, as well as request their removal by resigning from receiving the newsletter. You also have the right to data portability.

  #### E-mail contact

  By contacting us via e-mail, including sending an inquiry via the contact form, you naturally provide us with your e-mail address as the sender's address. In addition, you can also include other personal data in the text of the message.

  In this case, your data is processed in order to contact you, and the basis for processing is your consent resulting from initiating contact with us. The legal basis for processing after the end of contact is the justified purpose of archiving correspondence for internal purposes.

  The content of the correspondence may be archived and we are not able to clearly determine when it will be deleted. You have the right to request a history of correspondence with us (if it is subject to archiving), as well as request its removal, unless its archiving is justified due to our overriding interests, e.g. defense against potential claims on your part.

  #### Cookies

  Our website, like most modern websites, uses cookies to track website statistics, such as the number of visitors, type of operating system and web browser used to browse the website, time spent on the website, subpages visited, etc. We use Google Analytics in this regard, which involves the use of Google LLC cookies.
`;

const privacyPl = `
  ### Polityka Prywatności

  W tym dokumencie znajdziesz zasady przetwarzania danych osobowych oraz wykorzystywania plików cookies w związku z korzystaniem ze strony internetowej modularpage.com.

  Administratorem strony jest Piotr Wnuczek.

  W razie jakichkolwiek wątpliwości związanych z polityką prywatności, w każdej chwili możesz skontaktować się z nami, wysyłając wiadomość na adres contact@piotrwnuczek.pl.

  #### Najważniejsze informacje

  Zapisując się do newslettera lub kontaktując się z nami, przekazujesz nam swoje dane osobowe, a my gwarantujemy Ci, że Twoje dane pozostaną poufne, bezpieczne i nie zostaną udostępnione jakimkolwiek podmiotom trzecim bez Twojej wyraźnej zgody.

  Powierzamy przetwarzanie danych osobowych tylko sprawdzonym i zaufanym podmiotom świadczącym usługi związane z przetwarzaniem danych osobowych.

  Korzystamy z narzędzi analitycznych Google Analytics, które zbierają informacje na temat Twoich odwiedzin strony, takie jak podstrony, które wyświetliłeś, czas, jaki spędziłeś na stronie czy przejścia pomiędzy poszczególnymi podstronami. W tym celu wykorzystywane są pliki cookies firmy Google LLC dotyczące usługi Google Analytics.

  #### Bezpieczeństwo

  Gwarantujemy Ci poufność wszelkich przekazanych nam danych osobowych. Zapewniamy podjęcie wszelkich środków bezpieczeństwa i ochrony danych osobowych wymaganych przez przepisy o ochronie danych osobowych. Dane osobowe są gromadzone z należytą starannością i odpowiednio chronione przed dostępem do nich przez osoby do tego nieupoważnione.

  #### Wykaz powierzeń

  Powierzamy przetwarzanie danych osobowych firmie UAB Sender.lt, located at Perkūnkiemio 4A, Vilnius, Lithuania – w celu korzystania z systemu mailingowego, w którym przetwarzane są Twoje dane, jeżeli zapisałeś się do newslettera.

  Wszystkie podmioty, którym powierzamy przetwarzanie danych osobowych gwarantują stosowanie odpowiednich środków ochrony i bezpieczeństwa danych osobowych wymaganych przez przepisy prawa.

  #### Newsletter

  Jeżeli chcesz zapisać się do newslettera, musisz przekazać nam swój adres e-mail za pośrednictwem formularza zapisu do newslettera.

  Dane przekazane nam podczas zapisu do newslettera wykorzystywane są w celu przesyłania Ci newslettera, a podstawą prawną ich przetwarzania jest Twoja zgoda (art. 6 ust. 1 lit. a RODO) wyrażona podczas zapisywania się do newslettera.

  Dane przetwarzane są w ramach systemu mailingowego MailerLite i przechowywane na serwerze zapewnianym przez MailerLite.

  Dane będą przetwarzane przez czas funkcjonowania newslettera, chyba że wcześniej zrezygnujesz z jego otrzymywania, co spowoduje usunięcie Twoich danych z bazy.

  W każdej chwili możesz sprostować swoje dane zapisane w bazie newsletterowej, jak również zażądać ich usunięcia, rezygnując z otrzymywania newslettera. Przysługuje Ci również prawo do przenoszenia danych, o którym mowa w art. 20 RODO.

  #### Kontakt e-mailowy

  Kontaktując się z nami za pośrednictwem poczty elektronicznej, w tym również przesyłając zapytanie poprzez formularz kontaktowy, w sposób naturalny przekazujesz nam swój adres e-mail jako adres nadawcy wiadomości. Ponadto, w treści wiadomości możesz zawrzeć również inne dane osobowe.

  Twoje dane są w tym przypadku przetwarzane w celu kontaktu z Tobą, a podstawą przetwarzania jest art. 6 ust. 1 lit. a RODO, czyli Twoja zgoda wynikające z zainicjowania z nami kontaktu. Podstawą prawną przetwarzania po zakończeniu kontaktu jest usprawiedliwiony cel w postaci archiwizacji korespondencji na potrzeby wewnętrzne (art. 6 ust. 1 lit. c RODO).

  Treść korespondencji może podlegać archiwizacji i nie jesteśmy w stanie jednoznacznie określić, kiedy zostanie usunięta. Masz prawo do domagania się przedstawienia historii korespondencji, jaką z nami prowadziłeś (jeżeli podlega archiwizacji), jak również domagać się jej usunięcia, chyba że jej archiwizacja jest uzasadniona z uwagi na nasze nadrzędne interesy, np. obrona przed potencjalnymi roszczeniami z Twojej strony.

  #### Pliki cookies

  Nasza strona, podobnie jak większość współczesnych stron internetowych, wykorzystuje cookies do śledzenia statystyk strony, takich jak liczba osób odwiedzających, rodzaj systemu operacyjnego i przeglądarki internetowej wykorzystywanej do przeglądania strony, czas spędzony na stronie, odwiedzane podstrony etc. Korzystamy w tym zakresie z Google Analytics, co wiąże się z wykorzystaniem plików cookies firmy Google LLC.
`;

const PrivacyView = ({ lang }) => (
  <BasicLayout lang={lang}>
    <Box sx={{ py: 2, px: { xs: 5, md: 20 } }}>
      {lang === 'en' && <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        children={privacyEn}
      />}
      {lang === 'pl' && <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        children={privacyPl}
      />}
    </Box>
  </BasicLayout>
);

export default PrivacyView;
