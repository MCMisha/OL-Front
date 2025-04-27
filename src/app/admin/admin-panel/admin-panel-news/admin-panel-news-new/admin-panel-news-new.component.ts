import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AdminNewsService} from "../../../../services/admin/admin-news.service";
import {News} from "../../../../models/news";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-panel-news-new',
  templateUrl: './admin-panel-news-new.component.html',
  styleUrl: './admin-panel-news-new.component.scss'
})
export class AdminPanelNewsNewComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  newNewsForm!: FormGroup;
  subscription = new Subscription();
  news: News[] = [];
  mainImage = 'data:image/jpeg;base64,';
  selectedFileName?: string;
  selectedFile: string | undefined;

  isFileLoaded = false;

  constructor(private newsService: AdminNewsService,
              private fb: FormBuilder,
              protected router: Router,
              protected route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.newsService.getNews().subscribe(news => {
        this.news = news;
        this.isLoading = false;
      })
    );
    this.newNewsForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      subTitle: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      mainImage: [null, [Validators.required]],
      creationDate: [new Date(), [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(5000)]]
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
      this.selectedFile = (reader.result as string).split(',')[1];
      this.mainImage = reader.result as string;
      this.isFileLoaded = true;
      this.newNewsForm.patchValue({ mainImage: file.name });
      this.newNewsForm.get('mainImage')?.updateValueAndValidity();
    };

    input.value = '';
  }

  onDeleteImage() {
    this.selectedFile = undefined;
    this.selectedFileName = undefined;
    this.isFileLoaded = false;
    this.newNewsForm.patchValue({ mainImage: null });
    this.newNewsForm.get('mainImage')?.updateValueAndValidity();
    this.mainImage = 'data:image/jpeg;base64,';
  }

  saveNews() {
    if(this.newNewsForm.invalid) {
      console.error("Formularz jest nieprawidłowy lub plik nadal się ładuje!");
      return;
    }
    const newsData = {
      title: this.newNewsForm.value.title,
      subTitle: this.newNewsForm.value.subTitle,
      mainImage: this.selectedFile,
      creationDate: this.newNewsForm.value.creationDate,
      content: this.newNewsForm.value.content
    };

    this.newsService.createNews(newsData).subscribe(() => {
      this.router.navigate(['..'], { relativeTo: this.route });
    });
  }
}
