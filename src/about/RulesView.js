import React from 'react';
import { Box } from '@mui/material';
import BasicLayout from 'about/BasicLayout';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const rules = `
  ### Regulamin Newslettera

  #### §1 Definicje

  - Newsletter - nieodpłatna usługa świadczona drogą elektroniczną przez Usługodawcę polegająca na wysyłaniu Usługobiorcy na podany adres e-mail informacji dotyczących aplikacji ModularPage.
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
  - W sprawach nieuregulowanych w niniejszym Regulaminie zastosowanie mają powszechnie obowiązujące przepisy prawa polskiego, w szczególności przepisy  Ustawy Kodeks cywilny i Ustawy o świadczeniu usług drogą elektroniczną.
  - Usługobiorca będący Konsumentem  ma prawo skorzystać z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń, w szczególności z  pomocy miejskich (powiatowych) Rzeczników Konsumentów lub Europejskiej platformy internetowego rozstrzygania sporów (ODR) pomiędzy przedsiębiorcami a konsumentami.
`

const RulesView = () => (
  <BasicLayout>
    <Box sx={{ py: 2, px: { xs: 5, md: 20 } }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} children={rules} />
    </Box>
  </BasicLayout>
);

export default RulesView;
