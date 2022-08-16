import React from 'react';
import { Box } from '@mui/material';
import BasicLayout from 'about/BasicLayout';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const rulesEn = `
  ### Newsletter Rules

  #### §1 Definitions

  - Newsletter - a free service provided electronically by the Service Provider consisting in sending the Service Recipient to the e-mail address provided with information about the Modular Page application.
  - Consumer - a consumer within the meaning of the law.
  - Website - an internet platform run by the Service Provider under the domain modularpage.com, through which it is possible to subscribe to the Newsletter.
  - Service Provider - Piotr Wnuczek, contact: contact@piotrwnuczek.pl.
  - The customer who has signed up and uses the Newsletter service.
  - Regulations - these regulations for the provision of electronic services.
  - Privacy Policy - a separate document on the Website setting out the rules for the processing of personal data by the Service Provider.

  §2 Newsletter

  - The Service Recipient starts using the Newsletter after completing the following actions: providing an e-mail address, consenting to receiving correspondence containing information about the Website by electronic means, reading the content and accepting the Regulations and the Privacy Policy.
  - At the time of confirmation of the subscription by the Customer, a contract for the provision of the Newsletter service is concluded.
  - The condition for using the Newsletter is to have a technically efficient device with access to the Internet and the current version of the web browser and an active e-mail account. The Service Provider is not responsible for technical problems or limitations in the Customer's equipment that prevent him from using the Newsletter.
  - In the messages sent to the Service Recipient as part of the Newsletter, there will be information about the possibility of unsubscribing from the Newsletter along with a link enabling the resignation.
  - The Service Recipient may unsubscribe from the Newsletter at any time, without giving a reason and without incurring any costs. In order to exercise this right, you should use the opt-out option by clicking on the opt-out link.
  - If the Service Recipient resigns from the Newsletter, the contract for the provision of the Newsletter service will be terminated.

  §3 Intellectual property law

  - The newsletter may contain content protected by intellectual property law.
  - The Service Provider has the exclusive right to the content sent in the Newsletter. Thus, no content may be copied, corrected, distributed, downloaded, transferred, sold or otherwise used in whole or in part without the prior consent of the Service Provider.

  §4 Personal data

  - The administrator of personal data provided by the Service User when subscribing to the Newsletter is the Service Provider.
  - The Customer's personal data is processed in connection with the implementation of the contract for the provision of the Newsletter service in accordance with the applicable provisions on the protection of personal data.
  - Detailed information on the processing of personal data by the Service Provider is included in the Privacy Policy.

  §5 Final provisions

  - The Service Provider has the right to amend these Regulations in connection with the modernization of the Newsletter service or changes in the law. The Regulations are amended by placing the amended version of the Regulations on the Website, as well as by sending the Customer information about the amendment to the Regulations at least 14 days before the planned date of entry into force of the amendments. If the Service Recipient does not object to the changes until they enter into force, it is assumed that he accepts them.
  - It is forbidden for the Customer to provide illegal content.
  - In matters not covered by these Regulations, generally applicable law shall apply.
`;

const rulesPl = `
  ### Regulamin Newslettera

  #### §1 Definicje

  - Newsletter - nieodpłatna usługa świadczona drogą elektroniczną przez Usługodawcę polegająca na wysyłaniu Usługobiorcy na podany adres e-mail informacji dotyczących aplikacji Modular Page.
  - Konsument - konsument w rozumieniu art. 22 Kodeksu cywilnego.
  - Serwis - platforma internetowa prowadzona przez Usługodawcę pod domeną modularpage.com, za pośrednictwem której istnieje możliwość zapisania się do Newslettera.
  - Usługodawca - Piotr Wnuczek, kontakt: contact@piotrwnuczek.pl.
  - Usługobiorca ten, kto zapisał się i korzysta z usługi Newslettera.
  - Regulamin - niniejszy regulamin świadczenia usług drogą elektroniczną.
  - Polityka Prywatności - odrębny dokument znajdujący się w Serwisie określający zasady przetwarzania danych osobowych przez Usługodawcę.

  §2 Newsletter

  - Usługobiorca rozpoczyna korzystanie z Newslettera po wykonaniu łącznie następujących czynności: podanie adresu e-mail, wyrażenie zgody na otrzymywanie korespondencji zawierającej informacje na temat Serwisu drogą elektroniczną, zapoznanie się z treścią i akceptacja Regulaminu i Polityki Prywatności.
  - W momencie dokonania potwierdzenia zapisu przez Usługobiorcę zostaje zawarta umowa o świadczenie usługi Newslettera.
  - Warunkiem korzystania z Newslettera niezbędne jest posiadanie sprawnego technicznie urządzenia z dostępem do sieci Internet i aktualną wersją przeglądarki internetowej oraz aktywne konto e-mail. Usługodawca nie ponosi odpowiedzialności za problemy techniczne lub ograniczenia występujące w sprzęcie Usługobiorcy, które uniemożliwiają mu korzystanie z Newslettera.
  - W wiadomościach wysyłanych Usługobiorcy w ramach Newslettera będzie znajdować się informacja o możliwości wypisania się z Newslettera wraz linkiem umożliwiającym rezygnację.
  - Usługobiorca może wypisać się z Newslettera w każdym momencie, bez podawania przyczyny i ponoszenia jakichkolwiek kosztów. W celu realizacji tego uprawnienia należy skorzystać z możliwości rezygnacji przy pomocy kliknięcia w link umożliwiający rezygnację.
  - Jeśli Usługobiorca zrezygnuje z Newslettera na umowa o świadczenie usługi Newslettera ulegnie rozwiązaniu.

  §3 Prawo własność intelektualnej

  - Newsletter może zawierać treści chronione prawem własności intelektualnej.
  - Usługodawca posiada wyłączne prawo do treści przesyłanych w Newsletterze. Żadne treści nie mogą być tym samym kopiowane, poprawiane, rozpowszechniane, pobierane, przekazywane, sprzedawane lub w inny sposób wykorzystywane w całości lub w części bez uprzedniej zgody Usługodawcy.

  §4 Dane osobowe

  - Administratorem danych osobowych przekazanych przez Usługobiorcę podczas zapisywania się na korzystanie z Newslettera jest Usługodawca.
  - Dane osobowe Usługobiorcy przetwarzane są w związku z realizacją umowy o świadczenie usługi Newslettera zgodnie z obowiązującymi przepisami w zakresie ochrony danych osobowych.
  - Szczegółowe informacje dotyczące przetwarzania danych osobowych przez Usługodawcę zawiera Polityka Prywatności.

  §5 Postanowienia końcowe

  - Usługodawca ma prawo do zmiany niniejszego Regulaminu w związku z modernizacją usługi Newslettera czy zmianą przepisów prawa. Zmiana Regulaminu następuje poprzez umieszczenie zmienionej wersji Regulaminu na stronie Serwisu, a także przez przesłanie Usługobiorcy informacji o zmianie Regulaminu na co najmniej 14 dni przed planowanym dniem wejścia w życie zmian. Jeśli Usługobiorca nie sprzeciwia się zmianom do momentu ich wejścia w życie, przyjmuje się, że je akceptuje.
  - Zakazane jest dostarczanie przez Usługobiorcę treści o charakterze bezprawnym.
  - W sprawach nieuregulowanych w niniejszym Regulaminie zastosowanie mają powszechnie obowiązujące przepisy prawa polskiego, w szczególności przepisy Ustawy Kodeks cywilny i Ustawy o świadczeniu usług drogą elektroniczną.
`;

const RulesView = ({ lang }) => (
  <BasicLayout lang={lang}>
    <Box sx={{ py: 2, px: { xs: 5, md: 20 } }}>
      {lang === 'en' && <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        childern={rulesEn}
      />}
      {lang === 'pl' && <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        childern={rulesPl}
      />}
    </Box>
  </BasicLayout>
);

export default RulesView;
