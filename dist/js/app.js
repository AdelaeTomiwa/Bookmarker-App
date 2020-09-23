// Book mark class
class Bookmark {
   constructor(siteName, siteUrl) {
      this.siteName = siteName;
      this.siteUrl = siteUrl;
   }
}

// UI CLASS
class UI {
   static getBookmarksFromLocalStorage() {
      const bookmarks = Storage.getBookmarks();

      bookmarks.forEach((bookmark) => UI.addBookmark(bookmark));
   }

   static addBookmark(bookmark) {
      const newDiv = document.createElement('div');
      newDiv.classList.add('bookmark');
      newDiv.innerHTML = `
         <span>${bookmark.siteName}</span>
         <span><a target = "_blank" href="${bookmark.siteUrl}">${bookmark.siteUrl}</a></span>
         <span><button class ="delete-btn"><i class ="fas fa-trash"></i></button></span>
      `;

      const bookmarkList = document.querySelector('.bookmarked-list');
      bookmarkList.appendChild(newDiv);
   }

   static showAlert(message, className) {
      const alertDiv = document.createElement('div');
      alertDiv.classList = `alert alert-${className}`;
      alertDiv.appendChild(document.createTextNode(message));
      const main = document.querySelector('.main');
      const form = document.querySelector('#my-form');
      main.insertBefore(alertDiv, form);

      setTimeout(() => document.querySelector('.alert').remove(), 3000);
   }

   static removeBookmark(el) {
      if (el.classList.contains('delete-btn')) {
         el.parentElement.parentElement.remove();
      }
   }

   static clearFields() {
      const siteNameValue = (document.querySelector('#name-input').value = '');
      const siteUrlValue = (document.querySelector('#URL-input').value = '');
   }
}

// STORAGE CLASS
class Storage {
   static getBookmarks(bookmark) {
      let bookmarks;
      if (localStorage.getItem('bookmark') === null) {
         bookmarks = [];
      } else {
         bookmarks = JSON.parse(localStorage.getItem('bookmark'));
      }

      return bookmarks;
   }
   static addBookmarks(bookmark) {
      let bookmarks;
      if (localStorage.getItem('bookmark') === null) {
         bookmarks = [];
      } else {
         bookmarks = JSON.parse(localStorage.getItem('bookmark'));
      }

      bookmarks.push(bookmark);
      localStorage.setItem('bookmark', JSON.stringify(bookmarks));
   }

   static removeBookmarkFromLocalStorage(siteUrl) {
      const bookmarks = Storage.getBookmarks();

      console.log(bookmarks);
      bookmarks.forEach((bookmark, index) => {
         if (bookmark.siteUrl === siteUrl) {
            bookmarks.splice(index, 1);
         }

         localStorage.setItem('bookmark', JSON.stringify(bookmarks));
      });
   }
}

// Display Bookmarks
document.addEventListener('DOMContentLoaded', UI.getBookmarksFromLocalStorage);

// ADD BOOKMARK EVENT
document.querySelector('#my-form').addEventListener('submit', (e) => {
   e.preventDefault();
   const siteNameValue = document.querySelector('#name-input').value;
   const siteUrlValue = document.querySelector('#URL-input').value;

   if (siteNameValue === '' || siteUrlValue === '') {
      UI.showAlert(`Please Fill Out All Fields`, 'danger');
   } else {
      const bookmark = new Bookmark(siteNameValue, siteUrlValue);

      UI.addBookmark(bookmark);

      Storage.addBookmarks(bookmark);

      UI.showAlert(
         `${siteNameValue} has been Added to your Bookmark`,
         'success'
      );

      UI.clearFields();
   }
});

// REMOVE BOOKMARK
document.querySelector('.bookmarked-list').addEventListener('click', (e) => {
   UI.removeBookmark(e.target);

   if (e.target.classList.contains('delete-btn')) {
      Storage.removeBookmarkFromLocalStorage(
         e.target.parentElement.previousElementSibling.textContent
      );
   }
});
