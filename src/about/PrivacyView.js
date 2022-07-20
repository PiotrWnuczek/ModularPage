import React from 'react';
import { Box } from '@mui/material';
import BasicLayout from 'about/BasicLayout';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const privacy = `
  ### Polityka Prywatności

  W tym dokumencie znajdziesz zasady przetwarzania danych osobowych oraz wykorzystywania plików cookies w związku z korzystaniem ze strony internetowej modularpage.com.

  Administratorem strony jest Piotr Wnuczek.

  W razie jakichkolwiek wątpliwości związanych z polityką prywatności, w każdej chwili możesz skontaktować się z nami, wysyłając wiadomość na adres modularpagecom@gamil.com.

  #### Najważniejsze informacje

  Zapisując się do newslettera lub kontaktując się z nami, przekazujesz nam swoje dane osobowe, a my gwarantujemy Ci, że Twoje dane pozostaną poufne, bezpieczne i nie zostaną udostępnione jakimkolwiek podmiotom trzecim bez Twojej wyraźnej zgody.

  Powierzamy przetwarzanie danych osobowych tylko sprawdzonym i zaufanym podmiotom świadczącym usługi związane z przetwarzaniem danych osobowych.

  Korzystamy z narzędzi analitycznych Google Analytics, które zbierają informacje na temat Twoich odwiedzin strony, takie jak podstrony, które wyświetliłeś, czas, jaki spędziłeś na stronie czy przejścia pomiędzy poszczególnymi podstronami. W tym celu wykorzystywane są pliki cookies firmy Google LLC dotyczące usługi Google Analytics.

  #### Bezpieczeństwo

  Gwarantujemy Ci poufność wszelkich przekazanych nam danych osobowych. Zapewniamy podjęcie wszelkich środków bezpieczeństwa i ochrony danych osobowych wymaganych przez przepisy o ochronie danych osobowych. Dane osobowe są gromadzone z należytą starannością i odpowiednio chronione przed dostępem do nich przez osoby do tego nieupoważnione.

  #### Wykaz powierzeń

  Powierzamy przetwarzanie danych osobowych firmie MailerLite Limited, an Irish registered company at Ground Floor, 71 Lower Baggot Street, Dublin 2, D02 P593, Ireland – w celu korzystania z systemu mailingowego, w którym przetwarzane są Twoje dane, jeżeli zapisałeś się do newslettera.

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

const PrivacyView = () => (
  <BasicLayout>
    <Box sx={{ py: 2, px: { xs: 5, md: 20 } }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} children={privacy} />
    </Box>
  </BasicLayout>
);

export default PrivacyView;
