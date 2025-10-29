import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface UserProfile {
  name: string;
  status: string;
  avatar: string;
  birthDate: string;
  city: string;
  education: string;
  work: string;
  phone: string;
  about: string;
}

interface Post {
  id: number;
  text: string;
  likes: number;
  date: string;
  liked: boolean;
}

interface Photo {
  id: number;
  url: string;
  name: string;
}

const Index = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Иван Иванов',
    status: 'Жизнь хороша! 🚀',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ivan',
    birthDate: '15 марта 1995',
    city: 'Москва',
    education: 'МГУ им. М.В. Ломоносова',
    work: 'Google',
    phone: '+7 (999) 123-45-67',
    about: 'Люблю программирование и путешествия'
  });

  const [posts, setPosts] = useState<Post[]>([
    { id: 1, text: 'Отличный день сегодня! ☀️', likes: 15, date: '1 час назад', liked: false },
    { id: 2, text: 'Запустил новый проект, делюсь впечатлениями 🚀', likes: 23, date: '3 часа назад', liked: true }
  ]);

  const [newPost, setNewPost] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [photos, setPhotos] = useState<Photo[]>([]);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleAddPost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now(),
        text: newPost,
        likes: 0,
        date: 'только что',
        liked: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setEditDialogOpen(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newPhoto: Photo = {
            id: Date.now() + Math.random(),
            url: reader.result as string,
            name: file.name
          };
          setPhotos(prev => [...prev, newPhoto]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDeletePhoto = (photoId: number) => {
    setPhotos(photos.filter(photo => photo.id !== photoId));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <Icon name="Users" size={28} className="text-primary" />
          <h1 className="text-xl font-bold text-primary">МояСтраница</h1>
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Поиск" className="pl-10" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3">
            <Card className="p-4 sticky top-20">
              <nav className="space-y-2">
                <a href="#profile" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-accent text-foreground">
                  <Icon name="User" size={20} />
                  <span>Моя страница</span>
                </a>
                <a href="#news" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-accent text-foreground">
                  <Icon name="Newspaper" size={20} />
                  <span>Новости</span>
                </a>
                <a href="#messages" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-accent text-foreground">
                  <Icon name="MessageCircle" size={20} />
                  <span>Сообщения</span>
                </a>
                <a href="#friends" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-accent text-foreground">
                  <Icon name="Users" size={20} />
                  <span>Друзья</span>
                </a>
                <a href="#communities" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-accent text-foreground">
                  <Icon name="UserCircle" size={20} />
                  <span>Сообщества</span>
                </a>
                <a href="#photos" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-accent text-foreground">
                  <Icon name="Image" size={20} />
                  <span>Фотографии</span>
                </a>
                <a href="#music" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-accent text-foreground">
                  <Icon name="Music" size={20} />
                  <span>Музыка</span>
                </a>
                <a href="#videos" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-accent text-foreground">
                  <Icon name="Video" size={20} />
                  <span>Видео</span>
                </a>
              </nav>
            </Card>
          </aside>

          <main className="lg:col-span-9">
            <Card className="mb-6 overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20"></div>
              <div className="px-6 pb-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end -mt-16 mb-4">
                  <Avatar className="w-32 h-32 border-4 border-card">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback>{profile.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground">{profile.name}</h2>
                    <p className="text-muted-foreground">{profile.status}</p>
                  </div>
                  <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => setEditedProfile(profile)}>
                        <Icon name="Edit" size={16} className="mr-2" />
                        Редактировать
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Редактировать профиль</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Имя</Label>
                          <Input 
                            value={editedProfile.name}
                            onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label>Статус</Label>
                          <Input 
                            value={editedProfile.status}
                            onChange={(e) => setEditedProfile({...editedProfile, status: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label>Дата рождения</Label>
                          <Input 
                            value={editedProfile.birthDate}
                            onChange={(e) => setEditedProfile({...editedProfile, birthDate: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label>Город</Label>
                          <Input 
                            value={editedProfile.city}
                            onChange={(e) => setEditedProfile({...editedProfile, city: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label>Образование</Label>
                          <Input 
                            value={editedProfile.education}
                            onChange={(e) => setEditedProfile({...editedProfile, education: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label>Место работы</Label>
                          <Input 
                            value={editedProfile.work}
                            onChange={(e) => setEditedProfile({...editedProfile, work: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label>Телефон</Label>
                          <Input 
                            value={editedProfile.phone}
                            onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label>О себе</Label>
                          <Textarea 
                            value={editedProfile.about}
                            onChange={(e) => setEditedProfile({...editedProfile, about: e.target.value})}
                            rows={3}
                          />
                        </div>
                        <Button onClick={handleSaveProfile} className="w-full">
                          Сохранить изменения
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <Tabs defaultValue="info" className="mt-6">
                  <TabsList className="w-full justify-start">
                    <TabsTrigger value="info">Информация</TabsTrigger>
                    <TabsTrigger value="photos">Фотографии</TabsTrigger>
                    <TabsTrigger value="friends">Друзья</TabsTrigger>
                    <TabsTrigger value="communities">Сообщества</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="info" className="mt-4">
                    <div className="grid gap-3">
                      <div className="flex gap-2">
                        <Icon name="Calendar" size={18} className="text-muted-foreground mt-1" />
                        <div>
                          <span className="text-muted-foreground">День рождения: </span>
                          <span className="text-foreground">{profile.birthDate}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Icon name="MapPin" size={18} className="text-muted-foreground mt-1" />
                        <div>
                          <span className="text-muted-foreground">Город: </span>
                          <span className="text-foreground">{profile.city}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Icon name="GraduationCap" size={18} className="text-muted-foreground mt-1" />
                        <div>
                          <span className="text-muted-foreground">Образование: </span>
                          <span className="text-foreground">{profile.education}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Icon name="Briefcase" size={18} className="text-muted-foreground mt-1" />
                        <div>
                          <span className="text-muted-foreground">Работа: </span>
                          <span className="text-foreground">{profile.work}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Icon name="Phone" size={18} className="text-muted-foreground mt-1" />
                        <div>
                          <span className="text-muted-foreground">Телефон: </span>
                          <span className="text-foreground">{profile.phone}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Icon name="Info" size={18} className="text-muted-foreground mt-1" />
                        <div>
                          <span className="text-muted-foreground">О себе: </span>
                          <span className="text-foreground">{profile.about}</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="photos" className="mt-4">
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="aspect-square bg-muted rounded flex items-center justify-center">
                          <Icon name="Image" size={32} className="text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="friends" className="mt-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {['Анна', 'Петр', 'Мария', 'Алексей', 'Елена', 'Дмитрий'].map((name, i) => (
                        <Card key={i} className="p-3 text-center">
                          <Avatar className="w-16 h-16 mx-auto mb-2">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} />
                            <AvatarFallback>{name[0]}</AvatarFallback>
                          </Avatar>
                          <p className="text-sm font-medium text-foreground">{name}</p>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="communities" className="mt-4">
                    <div className="space-y-3">
                      {['Программисты России', 'Путешественники', 'Фотография'].map((community, i) => (
                        <Card key={i} className="p-3 flex items-center gap-3">
                          <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                            <Icon name="Users" size={24} className="text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{community}</p>
                            <p className="text-sm text-muted-foreground">Участник</p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>

            <Card className="p-4 mb-4">
              <h3 className="font-semibold mb-3 text-foreground">Новая запись</h3>
              <Textarea 
                placeholder="Что у вас нового?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="mb-3"
              />
              <Button onClick={handleAddPost} disabled={!newPost.trim()}>
                <Icon name="Send" size={16} className="mr-2" />
                Опубликовать
              </Button>
            </Card>

            <div className="space-y-4">
              {posts.map(post => (
                <Card key={post.id} className="p-4">
                  <div className="flex gap-3 mb-3">
                    <Avatar>
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback>{profile.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{profile.name}</p>
                      <p className="text-sm text-muted-foreground">{post.date}</p>
                    </div>
                  </div>
                  <p className="mb-3 text-foreground">{post.text}</p>
                  <div className="flex gap-4 pt-3 border-t border-border">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={post.liked ? 'text-primary' : ''}
                    >
                      <Icon name="Heart" size={16} className="mr-2" fill={post.liked ? 'currentColor' : 'none'} />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="MessageCircle" size={16} className="mr-2" />
                      Комментировать
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Share2" size={16} className="mr-2" />
                      Поделиться
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;