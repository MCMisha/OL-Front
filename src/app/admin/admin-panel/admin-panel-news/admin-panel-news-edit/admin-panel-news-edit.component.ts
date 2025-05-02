import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {News} from "../../../../models/news";
import {AdminNewsService} from "../../../../services/admin/admin-news.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-panel-news-edit',
  templateUrl: './admin-panel-news-edit.component.html',
  styleUrl: './admin-panel-news-edit.component.scss'
})
export class AdminPanelNewsEditComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  editNewsForm!: FormGroup;
  subscription = new Subscription();
  news: News[] = [];
  mainImage = 'data:image/jpeg;base64,';
  selectedFileName?: string;
  selectedFile: string | undefined;

  isFileLoaded = false;
  newsId: number | null = null;


  constructor(private newsService: AdminNewsService,
              private fb: FormBuilder,
              protected router: Router,
              protected route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.newsService.getNews().subscribe(news => {
        this.news = news;
        this.isLoading = false;
      })
    );
    this.initForm();

    this.subscription.add(
      this.route.params.subscribe(params => {
        if (params['id']) {
          this.newsId = +params['id'];
          this.loadNews(this.newsId);
          this.isLoading = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDeleteImage() {
    this.selectedFile = undefined;
    this.selectedFileName = undefined;
    this.isFileLoaded = false;
    this.editNewsForm.patchValue({mainImage: null});
    this.editNewsForm.get('mainImage')?.updateValueAndValidity();
    this.mainImage = 'data:image/jpeg;base64,';
  }

  saveNews() {
    if (this.editNewsForm.invalid) {
      console.error("Formularz jest nieprawidłowy lub plik nadal się ładuje!");
      return;
    }
    const newsData = {
      title: this.editNewsForm.value.title,
      subTitle: this.editNewsForm.value.subTitle,
      mainImage: this.selectedFile,
      creationDate: this.editNewsForm.value.creationDate,
      content: this.editNewsForm.value.content
    };

    this.newsService.updateNews(newsData).subscribe(() => {
      this.router.navigate(['..'], {relativeTo: this.route});
    });
  }

  private initForm(): void {
    this.editNewsForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      subTitle: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      mainImage: [null, [Validators.required]],
      creationDate: [new Date(), [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(5000)]]
    });
  }

  private loadNews(id: number): void {
    this.isLoading = true;
    this.subscription.add(
      this.newsService.getNewsById(id).subscribe({
        next: (news) => {
          this.editNewsForm.patchValue({
            title: news.title,
            subTitle: news.subtitle,
            creationDate: news.creationDate,
            content: news.content
          });

          if (news.mainImage) {
            this.selectedFile = news.mainImage;
            this.mainImage = 'data:image/jpeg;base64,' + news.mainImage;
            this.selectedFileName = 'uploaded-image.jpg';
            this.isFileLoaded = true;
            this.editNewsForm.patchValue({mainImage: 'uploaded-image'});
          }

          this.isLoading = false;
        },
        error: (error) => {
          console.error('Błąd:', error);
          this.isLoading = false;
        }
      })
    );
  }
  updateFileState(fileData: string | null) {
    if (fileData) {
      this.selectedFile = fileData;
      this.mainImage = 'data:image/jpeg;base64,' + fileData;
      this.isFileLoaded = true;
      this.editNewsForm.patchValue({mainImage: 'uploaded-image'});
      this.editNewsForm.get('mainImage')?.updateValueAndValidity();
    } else {
      this.selectedFile = undefined;
      this.selectedFileName = undefined;
      this.isFileLoaded = false;
      this.editNewsForm.patchValue({mainImage: null});
      this.editNewsForm.get('mainImage')?.updateValueAndValidity();
      this.mainImage = 'data:image/jpeg;base64,';
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.selectedFileName = file.name;
    this.isFileLoaded = false;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const fileData = (reader.result as string).split(',')[1];
      this.updateFileState(fileData);
    };

    input.value = '';
  }

}
