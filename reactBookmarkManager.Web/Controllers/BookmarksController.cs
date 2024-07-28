using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using reactBookmarkManager.Data;
using reactBookmarkManager.Web.ViewModels;

namespace reactBookmarkManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BookmarksController : ControllerBase
    {
        private readonly string _connectionString;

        public BookmarksController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost("addbookmark")]
        public void AddBookmark(Bookmark b)
        {
            var repo = new BookmarksRepo(_connectionString);
            var rp = new UserRepo(_connectionString);
            b.UserId = rp.GetByEmail(User.Identity.Name).Id;
            repo.AddBookmark(b);

        }

        [AllowAnonymous]
        [HttpGet]
        [Route("gettopfive")]
        public List<TopBookmark> GetTopFive()
        {
            var repo = new BookmarksRepo(_connectionString);
            return repo.GetTopFive();
        }

        [Route("getmine")]
        public List<Bookmark> GetMine()
        {
            var repo = new BookmarksRepo(_connectionString);
            var rp = new UserRepo(_connectionString);
            var user = rp.GetByEmail(User.Identity.Name);
            return repo.GetMine(user.Id);
        }

        [HttpPost("updatebookmark")]
        public void UpdateBookmark(Bookmark b)
        {
            var repo = new BookmarksRepo(_connectionString);
            repo.UpdateBookmark(b);

        }

        [HttpPost("deletebookmark")]
        public void DeleteBookmark(int id)
        {
            var repo = new BookmarksRepo(_connectionString);
            repo.DeleteBookmark(id);
        }
    }
}
