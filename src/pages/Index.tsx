import { useState, useEffect } from 'react';
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

interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  date: string;
}

interface Post {
  id: number;
  text: string;
  likes: number;
  date: string;
  liked: boolean;
  comments: Comment[];
  showComments: boolean;
  image?: string;
  timestamp: number;
}

interface Photo {
  id: number;
  url: string;
  name: string;
}

interface Music {
  id: number;
  title: string;
  artist: string;
}

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
}

interface Message {
  id: number;
  from: string;
  avatar: string;
  text: string;
  time: string;
  unread: boolean;
}

interface Community {
  id: number;
  name: string;
  members: number;
  avatar: string;
}

const Index = () => {
  const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  };

  const [profile, setProfile] = useState<UserProfile>(() => loadFromStorage('profile', {
    name: 'Иван Иванов',
    status: 'Жизнь хороша! 🚀',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ivan',
    birthDate: '15 марта 1995',
    city: 'Москва',
    education: 'МГУ им. М.В. Ломоносова',
    work: 'Google',
    phone: '+7 (999) 123-45-67',
    about: 'Люблю программирование и путешествия'
  }));

  const [posts, setPosts] = useState<Post[]>(() => loadFromStorage('posts', [
    { id: 1, text: 'Отличный день сегодня! ☀️', likes: 15, date: '1 час назад', liked: false, comments: [], showComments: false, timestamp: Date.now() - 3600000 },
    { id: 2, text: 'Запустил новый проект, делюсь впечатлениями 🚀', likes: 23, date: '3 часа назад', liked: true, comments: [
      { id: 1, author: 'Анна Смирнова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna', text: 'Поздравляю! 🎉', date: '2 часа назад' }
    ], showComments: false, timestamp: Date.now() - 10800000 }
  ]));

  const [newPost, setNewPost] = useState('');
  const [newPostImage, setNewPostImage] = useState<string>('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [editPostDialogOpen, setEditPostDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editedPostText, setEditedPostText] = useState('');
  const [editedPostImage, setEditedPostImage] = useState<string>('');
  const [photos, setPhotos] = useState<Photo[]>(() => loadFromStorage('photos', []));
  const [music, setMusic] = useState<Music[]>(() => loadFromStorage('music', [
    { id: 1, title: 'Imagine', artist: 'John Lennon' },
    { id: 2, title: 'Bohemian Rhapsody', artist: 'Queen' },
    { id: 3, title: 'Hotel California', artist: 'Eagles' }
  ]));
  const [videos, setVideos] = useState<Video[]>(() => loadFromStorage('videos', [
    { id: 1, title: 'Путешествие в горы', thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=video1', duration: '5:32' },
    { id: 2, title: 'Мой проект', thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=video2', duration: '3:15' }
  ]));
  const [messages, setMessages] = useState<Message[]>(() => loadFromStorage('messages', [
    { id: 1, from: 'Анна Смирнова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna', text: 'Привет! Как дела?', time: '10:30', unread: true },
    { id: 2, from: 'Петр Иванов', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Petr', text: 'Увидел твой пост, круто!', time: 'вчера', unread: false }
  ]));
  const [communities, setCommunities] = useState<Community[]>(() => loadFromStorage('communities', [
    { id: 1, name: 'Программисты России', members: 45231, avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=prog' },
    { id: 2, name: 'Путешественники', members: 23456, avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=travel' },
    { id: 3, name: 'Фотография', members: 12890, avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=photo' }
  ]));
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('Анна Смирнова');
  const [commentAvatar, setCommentAvatar] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=Anna');

  const mockUsers = [
    { name: 'Анна Смирнова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna' },
    { name: 'Петр Иванов', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Petr' },
    { name: 'Мария Петрова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria' },
    { name: 'Алексей Сидоров', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexey' }
  ];

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleAddPost = () => {
    if (newPost.trim()) {
      const timestamp = Date.now();
      const post: Post = {
        id: timestamp,
        text: newPost,
        likes: 0,
        date: new Date(timestamp).toLocaleString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }),
        liked: false,
        comments: [],
        showComments: false,
        image: newPostImage,
        timestamp
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setNewPostImage('');
    }
  };

  const handlePostImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPostImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setEditedPostText(post.text);
    setEditedPostImage(post.image || '');
    setEditPostDialogOpen(true);
  };

  const handleSaveEditedPost = () => {
    if (editingPost && editedPostText.trim()) {
      setPosts(posts.map(post => 
        post.id === editingPost.id
          ? { ...post, text: editedPostText, image: editedPostImage }
          : post
      ));
      setEditPostDialogOpen(false);
      setEditingPost(null);
      setEditedPostText('');
      setEditedPostImage('');
    }
  };

  const handleEditPostImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedPostImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter(post => post.id !== postId));
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

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenCommentDialog = (postId: number) => {
    setCurrentPostId(postId);
    setCommentDialogOpen(true);
  };

  const handleAddComment = () => {
    if (commentText.trim() && currentPostId) {
      const newComment: Comment = {
        id: Date.now(),
        author: commentAuthor,
        avatar: commentAvatar,
        text: commentText,
        date: 'только что'
      };
      setPosts(posts.map(post => 
        post.id === currentPostId
          ? { ...post, comments: [...post.comments, newComment], showComments: true }
          : post
      ));
      setCommentText('');
      setCommentDialogOpen(false);
    }
  };

  const handleToggleComments = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId
        ? { ...post, showComments: !post.showComments }
        : post
    ));
  };

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('photos', JSON.stringify(photos));
  }, [photos]);

  useEffect(() => {
    localStorage.setItem('music', JSON.stringify(music));
  }, [music]);

  useEffect(() => {
    localStorage.setItem('videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('communities', JSON.stringify(communities));
  }, [communities]);

  const formatPostDate = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'только что';
    if (minutes < 60) return `${minutes} мин${minutes === 1 ? 'уту' : 'ут'} назад`;
    if (hours < 24) return `${hours} час${hours === 1 ? '' : hours < 5 ? 'а' : 'ов'} назад`;
    if (days < 7) return `${days} д${days === 1 ? 'ень' : days < 5 ? 'ня' : 'ней'} назад`;
    
    return new Date(timestamp).toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
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
                  <div className="relative group">
                    <Avatar className="w-32 h-32 border-4 border-card">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback>{profile.name[0]}</AvatarFallback>
                    </Avatar>
                    <label 
                      htmlFor="avatar-upload" 
                      className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Icon name="Camera" size={32} className="text-white" />
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground">{profile.name}</h2>
                    <p className="text-muted-foreground">{profile.status}</p>
                  </div>
                  <Dialog open={editDialogOpen} onOpenChange={(open) => {
                    setEditDialogOpen(open);
                    if (open) setEditedProfile(profile);
                  }}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Icon name="Edit" size={16} className="mr-2" />
                        Редактировать
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" onInteractOutside={(e) => e.preventDefault()}>
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
                  <TabsList className="w-full justify-start overflow-x-auto">
                    <TabsTrigger value="info">Информация</TabsTrigger>
                    <TabsTrigger value="photos">Фотографии</TabsTrigger>
                    <TabsTrigger value="music">Музыка</TabsTrigger>
                    <TabsTrigger value="videos">Видео</TabsTrigger>
                    <TabsTrigger value="friends">Друзья</TabsTrigger>
                    <TabsTrigger value="communities">Сообщества</TabsTrigger>
                    <TabsTrigger value="messages">Сообщения</TabsTrigger>
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
                    <div className="mb-4">
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        className="mb-2"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {photos.map(photo => (
                        <div key={photo.id} className="relative aspect-square group">
                          <img src={photo.url} alt={photo.name} className="w-full h-full object-cover rounded" />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleDeletePhoto(photo.id)}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      ))}
                      {photos.length === 0 && (
                        <div className="col-span-3 text-center py-8 text-muted-foreground">
                          Загрузите первое фото
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="music" className="mt-4">
                    <div className="space-y-2">
                      {music.map(track => (
                        <Card key={track.id} className="p-3 flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
                            <Icon name="Music" size={20} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{track.title}</p>
                            <p className="text-sm text-muted-foreground">{track.artist}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Icon name="Play" size={16} />
                          </Button>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="videos" className="mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      {videos.map(video => (
                        <Card key={video.id} className="overflow-hidden">
                          <div className="relative aspect-video bg-muted">
                            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <Button variant="secondary" size="lg" className="rounded-full">
                                <Icon name="Play" size={24} />
                              </Button>
                            </div>
                            <span className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
                              {video.duration}
                            </span>
                          </div>
                          <div className="p-3">
                            <p className="font-medium text-sm text-foreground">{video.title}</p>
                          </div>
                        </Card>
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
                      {communities.map(community => (
                        <Card key={community.id} className="p-3 flex items-center gap-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={community.avatar} alt={community.name} />
                            <AvatarFallback>
                              <Icon name="Users" size={24} className="text-primary" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{community.name}</p>
                            <p className="text-sm text-muted-foreground">{community.members.toLocaleString()} участников</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Icon name="Bell" size={16} className="mr-2" />
                            Подписан
                          </Button>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="messages" className="mt-4">
                    <div className="space-y-2">
                      {messages.map(message => (
                        <Card key={message.id} className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-accent transition-colors ${message.unread ? 'bg-accent/50' : ''}`}>
                          <Avatar>
                            <AvatarImage src={message.avatar} alt={message.from} />
                            <AvatarFallback>{message.from[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className={`font-medium text-sm ${message.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {message.from}
                              </p>
                              <span className="text-xs text-muted-foreground">{message.time}</span>
                            </div>
                            <p className={`text-sm truncate ${message.unread ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                              {message.text}
                            </p>
                          </div>
                          {message.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
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
                rows={3}
              />
              {newPostImage && (
                <div className="relative mb-3 w-full max-w-md">
                  <img src={newPostImage} alt="Preview" className="w-full rounded-lg" />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setNewPostImage('')}
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              )}
              <div className="flex gap-2">
                <label htmlFor="post-image-upload">
                  <Button variant="outline" size="sm" type="button" asChild>
                    <span>
                      <Icon name="Image" size={16} className="mr-2" />
                      Фото
                    </span>
                  </Button>
                </label>
                <input
                  id="post-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePostImageUpload}
                  className="hidden"
                />
                <Button onClick={handleAddPost} disabled={!newPost.trim()}>
                  <Icon name="Send" size={16} className="mr-2" />
                  Опубликовать
                </Button>
              </div>
            </Card>

            <div className="space-y-4">
              {posts.map(post => (
                <Card key={post.id} className="p-4">
                  <div className="flex gap-3 mb-3">
                    <Avatar>
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback>{profile.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{profile.name}</p>
                      <p className="text-sm text-muted-foreground">{formatPostDate(post.timestamp)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditPost(post)}
                      >
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                  <p className="mb-3 text-foreground whitespace-pre-wrap">{post.text}</p>
                  {post.image && (
                    <img src={post.image} alt="Post" className="w-full rounded-lg mb-3 max-w-2xl" />
                  )}
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
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => post.comments.length > 0 ? handleToggleComments(post.id) : handleOpenCommentDialog(post.id)}
                    >
                      <Icon name="MessageCircle" size={16} className="mr-2" />
                      {post.comments.length > 0 ? `Комментарии (${post.comments.length})` : 'Комментировать'}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Share2" size={16} className="mr-2" />
                      Поделиться
                    </Button>
                  </div>

                  {post.comments.length > 0 && post.showComments && (
                    <div className="mt-4 space-y-3 pt-3 border-t border-border">
                      {post.comments.map(comment => (
                        <div key={comment.id} className="flex gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={comment.avatar} alt={comment.author} />
                            <AvatarFallback>{comment.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-muted rounded-lg px-3 py-2">
                              <p className="text-sm font-semibold text-foreground">{comment.author}</p>
                              <p className="text-sm text-foreground">{comment.text}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 ml-3">{comment.date}</p>
                          </div>
                        </div>
                      ))}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleOpenCommentDialog(post.id)}
                        className="ml-11"
                      >
                        <Icon name="Plus" size={16} className="mr-2" />
                        Добавить комментарий
                      </Button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>

      <Dialog open={commentDialogOpen} onOpenChange={setCommentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить комментарий</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>От чьего имени комментировать?</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {mockUsers.map((user) => (
                  <Button
                    key={user.name}
                    variant={commentAuthor === user.name ? 'default' : 'outline'}
                    className="justify-start h-auto py-2"
                    onClick={() => {
                      setCommentAuthor(user.name);
                      setCommentAvatar(user.avatar);
                    }}
                  >
                    <Avatar className="w-8 h-8 mr-2">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{user.name}</span>
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Label>Комментарий</Label>
              <Textarea
                placeholder="Напишите комментарий..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={3}
              />
            </div>
            <Button onClick={handleAddComment} disabled={!commentText.trim()} className="w-full">
              <Icon name="Send" size={16} className="mr-2" />
              Отправить комментарий
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={editPostDialogOpen} onOpenChange={setEditPostDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать пост</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Текст поста</Label>
              <Textarea
                value={editedPostText}
                onChange={(e) => setEditedPostText(e.target.value)}
                rows={4}
                className="mt-2"
              />
            </div>
            {editedPostImage && (
              <div className="relative w-full max-w-md">
                <img src={editedPostImage} alt="Preview" className="w-full rounded-lg" />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => setEditedPostImage('')}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            )}
            <div>
              <label htmlFor="edit-post-image-upload">
                <Button variant="outline" size="sm" type="button" asChild>
                  <span>
                    <Icon name="Image" size={16} className="mr-2" />
                    {editedPostImage ? 'Изменить фото' : 'Добавить фото'}
                  </span>
                </Button>
              </label>
              <input
                id="edit-post-image-upload"
                type="file"
                accept="image/*"
                onChange={handleEditPostImageUpload}
                className="hidden"
              />
            </div>
            <Button onClick={handleSaveEditedPost} disabled={!editedPostText.trim()} className="w-full">
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить изменения
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;