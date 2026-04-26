import {Component} from '@angular/core';

@Component({
  selector: 'app-admin-panel-main',
  templateUrl: './admin-panel-main.component.html',
  styleUrl: './admin-panel-main.component.scss'
})
export class AdminPanelMainComponent {
  protected accordionItems = [
    {
      icon: 'wallpaper',
      title: 'Slider główny',
      description: 'W sekcji "Slider główny" możesz zarządzać obrazkami(dodawać, edytować, usuwać, oraz zmieniać kolejność), które ' +
        'znajdują się na stronie głównej.'
    },
    {
      icon: 'theater_comedy',
      title: 'Gatunki',
      description: 'W sekcji "Gatunki" możesz zarządzać gatunkami(dodawać, edytować oraz usuwać).'
    },
    {
      icon: 'pin_drop',
      title: 'Miejsca',
      description: 'W sekcji "Miejsca" możesz zarządzać miejscami(dodawać, edytować oraz usuwać).'
    },
    {
      icon: 'event',
      title: 'Spektakle',
      description: 'W sekcji „Spektakle” możesz zarządzać spektaklami (dodawać je, edytować oraz usuwać). Istnieje także możliwość edytowania realizatorów, cen biletów, obsady oraz terminów. '
    },
    {icon: 'newspaper', title: 'Aktualności', description: 'W sekcji „Aktualności” możesz zarządzać wpisami informacyjnymi publikowanymi na stronie (dodawać, edytować oraz usuwać). Aktualności służą do informowania użytkowników o wydarzeniach i nowościach.'},
    {icon: 'info', title: 'O nas', description: 'W sekcji „O nas” możesz edytować treści informacyjne dotyczące instytucji, jej historii oraz działalności. Informacje te są wyświetlane na stronie publicznej w sekcji „O nas”.'},
    {icon: 'contact_page', title: 'Kontakt', description: 'W sekcji „Kontakt” możesz zarządzać danymi kontaktowymi, takimi jak adres, numer telefonu, adres e-mail oraz inne informacje udostępniane użytkownikom.'},
    {icon: 'person_outline', title: 'Artyści', description: 'W sekcji „Artyści” możesz zarządzać danymi artystów (dodawać, edytować oraz usuwać). Artyści mogą być przypisywani do spektakli jako część obsady.'},
    {icon: 'forum', title: 'Publiczne recencji', description: 'W sekcji „Publiczne recenzje” możesz zarządzać opiniami użytkowników (przeglądać oraz usuwać). Recenzje są wyświetlane publicznie na stronie i dotyczą konkretnych spektakli.'}
  ];
}
